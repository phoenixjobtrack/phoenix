const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
console.log(process.env.SENDGRID_API_KEY)

class Emailer {
  constructor(client) {
    this.developmentModeMessage = `
      This message was sent from a development or staging server and should not have been sent to any users.
      If you have recieved this message please send an email to ${process.env.DEVELOPER_EMAIL}`
    this.client = client
  }

  sendMail(options) {
    options.from = process.env.SENDGRID_FROM
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.NODE_ENV === 'staging'
    ) {
      options.to = process.env.DEVELOPER_EMAIL
      options.cc = ''
      options.bcc = ''
      options.text += this.developmentModeMessage
      options.html += this.developmentModeMessage
    }
    return this.client.send(options)
  }
}

const emailer = new Emailer(sgMail)

module.exports = { emailer }