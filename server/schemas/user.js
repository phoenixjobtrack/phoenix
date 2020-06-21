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
    disabled: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // status: {
    //   type: Sequelize.DataTypes.STRING,
    //   defaultValue: false,
    //   validate: {
    //     isIn: Object.keys(User.statuses),
    //   },
    // },
  },
  { sequelize, tableName: 'users', underscored: true },
)

module.exports = { User }
