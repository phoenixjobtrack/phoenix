const Sequelize = require('sequelize')

// Option 1: Passing parameters separately
const sequelize = new Sequelize('pheonix', '', '', {
  host: 'localhost', // Server hosting the postgres database
  dialect: 'postgres',
  define: {
    // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
    // This was true by default, but now is false by default
    timestamps: false,
  },
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = { sequelize, Sequelize }
