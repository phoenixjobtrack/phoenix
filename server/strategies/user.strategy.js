const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const encryptLib = require('../modules/encryption')
const { User } = require('../schemas/user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findOne({
    attributes: ['id', 'firstName', 'lastName', 'email', 'status'],
    where: {
      id,
    },
  })
    .then((user) => {
      if (user) {
        done(null, user)
      } else {
        done(null, null)
      }
    })
    .catch((error) => {
      done(error, null)
    })
})

// Does actual work of logging in
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({
        where: {
          email,
          status: User.statuses.ACTIVE,
        },
      })
        .then((user) => {
          if (user && encryptLib.comparePassword(password, user.password)) {
            delete user.password
            done(null, user)
          } else {
            done(null, null)
          }
        })
        .catch((error) => {
          console.log(error)
          done(error, null)
        })
    },
  ),
)

module.exports = passport
