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
    userId: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      field: 'user_id',
    },
    taskName: {
      type: Sequelize.DataTypes.STRING(255),
      field: 'task_name',
    },
    dueDate: {
      type: Sequelize.DataTypes.DATE,
      field: 'due_date',
    },
    complete: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
    contactId: {
      type: Sequelize.DataTypes.BOOLEAN,
      field: 'contact_id',
    },
    jobId: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      field: 'job_id',
    },
    note: {
      type: Sequelize.DataTypes.STRING(255),
    },
    disabled: {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, tableName: 'tasks' },
)

module.exports = { Task }
