const Sequelize = require('sequelize')
const { sequelize } = require('./sequelize')
const Model = Sequelize.Model
class Stage extends Model {}
Stage.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    stage: {
      type: Sequelize.DataTypes.STRING(255),
    },
    note: {
      type: Sequelize.DataTypes.STRING(500),
    },
    date: {
      type: Sequelize.DataTypes.DATE,
    },
    jobId: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      field: 'job_id',
    },
  },
  { sequelize, tableName: 'stages', underscored: true },
)

module.exports = { Stage }
