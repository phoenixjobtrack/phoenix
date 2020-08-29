const express = require('express')
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware')
const encryptLib = require('../modules/encryption')
const userStrategy = require('../strategies/user.strategy')
const { Token, User } = require('../schemas')
const { v4: uuidv4 } = require('uuid')
const { emailer } = require('../modules/emailer')

const router = express.Router()

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user)
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const password = encryptLib.encryptPassword(req.body.password)

  User.create({
    firstName,
    lastName,
    email,
    password,
  })
    .then(async (user) => {
      console.log(Token.scopes.VERIFY_USER)
      const token = await Token.create({
        userId: user.id,
        token: uuidv4(),
        scope: Token.scopes.VERIFY_USER,
      })
      const mailOptions = {
        to: email,
        subject: 'Confirm Pheonix Account',
        text: `
        Welcome to Pheonix.
        Before you can begin using the app you need to confirm your account by visiting on the following link: ${process.env.CLIENT_URL}/confirm/${token.token}
        `,
        html: `
        <p>Welcome to Pheonix.</p>
        <p>Before you can begin using the app you need to confirm your account by clicking <a href="${process.env.CLIENT_URL}/confirm/${token.token}">here</a></p>
        <p>or use the visiting link: ${process.env.CLIENT_URL}/confirm/${token.token}</p>
        `,
      }
      return emailer.sendMail(mailOptions).catch((error) => {
        console.error(error.response.body.errors)
        throw new Error('Error sending email')
      })
    })
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log(err)
      console.log(err.errors[0])
      res.sendStatus(500)
    })
})

router.put('/confirm/:userToken', async (req, res) => {
  const { userToken } = req.params
  try {
    const token = await Token.findOne({
      where: {
        token: userToken,
        usedAt: null,
      },
    })
    if (!token) return res.sendStatus(404)
    if (token.scope !== Token.scopes.VERIFY_USER) return res.sendStatus(401)
    await User.update(
      { status: User.statuses.ACTIVE },
      { where: { id: token.userId } },
    )
    await Token.update({ usedAt: new Date() }, { where: { id: token.id } })
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.put('/:id', (req, res) => {
  const { firstName, lastName, email } = req.body
  User.update(
    {
      firstName,
      lastName,
      email,
    },
    {
      where: {
        id: req.user.id,
      },
    },
  )
    .then((user) => {
      res.send(user)
    })
    .catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
})

router.get('/forgotten-password', (req, res) => {
  const { email } = req.query

  User.findOne({ where: { email } })
    .then((user) => {
      console.log(user)
      if (!user) return res.status(404).send({ message: 'user not found' })
      return Token.create({
        userId: user.id,
        token: uuidv4(),
        scope: Token.scopes.FORGOTTEN_PASSWORD,
      })
    })
    .then((token) => {
      const mailOptions = {
        to: email,
        subject: 'Reset Pheonix Password',
        text: `
        A new password has been requested for ${email}.
        To reset your password use the following link: ${process.env.CLIENT_URL}/forgotten-password/${token.token}
        `,
        html: `
        <p>A new password has been requested for ${email}.</p>
        <p>To reset your password click <a href="${process.env.CLIENT_URL}/forgotten-password/${token.token}">here</a></p>
        <p>or use the following link: ${process.env.CLIENT_URL}/forgotten-password/${token.token}</p>
        `,
      }
      return emailer
        .sendMail(mailOptions)
        .then(() => {
          res.sendStatus(201)
        })
        .catch((error) => {
          console.error(error)
          console.error(error.response.body.errors)
          res.sendStatus(500)
        })
    })
})

router.post('/forgotten-password/:userToken', async (req, res) => {
  const { userToken } = req.params
  try {
    const token = await Token.findOne({
      where: {
        token: userToken,
        usedAt: null,
      },
    })
    if (!token) return res.sendStatus(404)
    if (token.scope !== Token.scopes.FORGOTTEN_PASSWORD)
      return res.sendStatus(401)
    const password = encryptLib.encryptPassword(req.body.password)
    await User.update({ password }, { where: { id: token.userId } })
    await Token.update({ usedAt: new Date() }, { where: { id: token.id } })
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

// router.post('/forgotten-password', (req, ))

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200)
})

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout()
  res.sendStatus(200)
})

module.exports = router
