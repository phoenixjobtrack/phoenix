const Sequelize = require('sequelize')
const { sequelize } = require('./sequelize')
const Model = Sequelize.Model
class JobRequirment extends Model {}
JobRequirment.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    jobId: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      field: 'job_id',
    },
    requirementOffer: {
      type: Sequelize.DataTypes.STRING(255),
      field: 'requirement_offer',
    },
    requirementMet: {
      type: Sequelize.DataTypes.BOOLEAN,
    },
  },
  { sequelize, tableName: 'jobs_requirment' },
)

module.exports = { JobRequirment }
