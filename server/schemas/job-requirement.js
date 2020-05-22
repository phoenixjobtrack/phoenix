const Sequelize = require('sequelize')
const { sequelize } = require('./sequelize')
const Model = Sequelize.Model
class JobRequirement extends Model {}
JobRequirement.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    requirementOffer: {
      type: Sequelize.DataTypes.STRING(255),
      field: 'requirement_offer',
    },
    requirementMet: {
      type: Sequelize.DataTypes.BOOLEAN,
    },
  },
  { sequelize, tableName: 'jobs_requirements', underscored: true },
)

module.exports = { JobRequirement }
