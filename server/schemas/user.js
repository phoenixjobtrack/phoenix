const Sequelize = require('sequelize')
const { sequelize } = require('./sequelize')
const Model = Sequelize.Model
class User extends Model {
  static get statuses() {
    return {
      DISABLED: 'DISABLED',
      ACTIVE: 'ACTIVE',
      UNVERIFIED: 'UNVERIFIED',
    }
  }
}
User.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.DataTypes.STRING(255),
      field: 'first_name',
    },
    lastName: {
      type: Sequelize.DataTypes.STRING(255),
      field: 'last_name',
    },
    email: {
      type: Sequelize.DataTypes.STRING(255),
      unique: true,
    },
    password: {
      type: Sequelize.DataTypes.STRING(255),
      validate: {
        max: 45,
      },
    },
    status: {
      type: Sequelize.DataTypes.STRING,
      validate: {
        isValidStatus(value) {
          if (!User.statuses[value]) throw new Error(`Invalid status: ${value}`)
        },
      },
    },
  },
  { sequelize, tableName: 'users', underscored: true },
)

module.exports = { User }
