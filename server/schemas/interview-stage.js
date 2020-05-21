const Sequelize = require('sequelize')
const { sequelize } = require('./sequelize')
const Model = Sequelize.Model
class InterviewStages extends Model {}
InterviewStages.init(
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
  { sequelize, tableName: 'interview_stages' },
)

module.exports = { InterviewStages }
