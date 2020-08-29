const Sequelize = require('sequelize')
const { sequelize } = require('./sequelize')
const Model = Sequelize.Model
class Job extends Model {}
Job.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      field: 'user_id',
    },
    position: {
      type: Sequelize.DataTypes.STRING(255),
    },
    companyName: {
      type: Sequelize.DataTypes.STRING(255),
      field: 'company_name',
    },
    notes: {
      type: Sequelize.DataTypes.STRING(500),
    },
    postingUrl: {
      type: Sequelize.DataTypes.STRING(500),
      field: 'posting_url',
    },
    deadline: {
      type: Sequelize.DataTypes.DATE,
    },
    compensation: {
      type: Sequelize.DataTypes.STRING(255),
    },
    benefits: {
      type: Sequelize.DataTypes.STRING(500),
    },
    travel: {
      type: Sequelize.DataTypes.STRING(500),
    },
    closed: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, tableName: 'jobs', underscored: true },
)

module.exports = { Job }
