const Sequelize = require('sequelize')
const { sequelize } = require('./sequelize')
const Model = Sequelize.Model
class Contact extends Model {}
Contact.init(
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
    firstName: {
      type: Sequelize.DataTypes.STRING(255),
      field: 'first_name',
    },
    lastName: {
      type: Sequelize.DataTypes.STRING(255),
      field: 'last_name',
    },
    company: {
      type: Sequelize.DataTypes.STRING(255),
      field: 'company',
    },
    position: {
      type: Sequelize.DataTypes.STRING(255),
    },
    email: {
      type: Sequelize.DataTypes.STRING(255),
      unique: true,
    },
    linkedinUrl: {
      type: Sequelize.DataTypes.STRING(200),
      field: 'linkedin_url',
    },
    cell: {
      type: Sequelize.DataTypes.STRING(30),
    },
    phone: {
      type: Sequelize.DataTypes.STRING(30),
    },
    notes: {
      type: Sequelize.DataTypes.STRING(500),
    },
    disabled: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, tableName: 'contacts', underscored: true },
)

module.exports = { Contact }
