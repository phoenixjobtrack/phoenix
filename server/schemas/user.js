const Sequelize = require('sequelize')
const {sequelize} = require('./sequelize');
const Model = Sequelize.Model
class User extends Model {}
User.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.DataTypes.STRING(45),
      field: 'first_name',
    },
    lastName: {
      type: Sequelize.DataTypes.STRING(45),
      field: 'last_name',
    },
    email: {
      type: Sequelize.DataTypes.STRING(100),
      unique: true,
    },
    password: {
      type: Sequelize.DataTypes.STRING(45),
      validate: {
        max: 45,
      },
    },
    disabled: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  { sequelize, tableName: 'users' },
)

module.exports = { User };