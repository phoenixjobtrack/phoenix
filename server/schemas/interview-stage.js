const Sequelize = require('sequelize')
const { sequelize } = require('./sequelize')
const Model = Sequelize.Model
class Task extends Model {}
Task.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    stage: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { sequelize, tableName: 'tasks' },
)

module.exports = { Task }
