const Sequelize = require('sequelize')
const { sequelize } = require('./sequelize')
const Model = Sequelize.Model
class Requirement extends Model {}
Requirement.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    requirement: {
      type: Sequelize.DataTypes.STRING(255),
      allowNull: false,
    },
    userId: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      field: 'user_id',
    },
    disabled: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, tableName: 'requirements', underscored: true },
)

module.exports = { Requirement }
