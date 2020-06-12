const { sequelize, Sequelize } = require('./sequelize')
const { Contact } = require('./contact')
const { InterviewStage } = require('./interview-stage')
const { JobRequirement } = require('./job-requirement')
const { Job } = require('./job')
const { Requirement } = require('./requirement')
const { Stage } = require('./stage')
const { Task } = require('./task')
const { User } = require('./user')

Job.belongsToMany(Requirement, { through: JobRequirement, foreignKey: 'jobId' })
Requirement.belongsToMany(Job, {
  through: JobRequirement,
  foreignKey: 'requirementId',
})

Job.hasMany(JobRequirement, { foreignKey: 'id', targetKey: 'jobId' })
Requirement.hasMany(JobRequirement, {
  foreignKey: 'id',
  targetKey: 'requirementId',
})

JobRequirement.belongsTo(Requirement, {
  foreignKey: 'requirementId',
  targetKey: 'id',
})

Job.hasMany(Stage, { foreignKey: 'jobId', targetKey: 'id' })
Stage.belongsTo(Job, { foreignKey: 'jobId', targetKey: 'id' })

Job.hasMany(Task, { foreignKey: 'jobId', targetKey: 'id' })
Task.belongsTo(Job, { foreignKey: 'jobId', targetKey: 'id' })

module.exports = {
  Contact,
  InterviewStage,
  JobRequirement,
  Job,
  Requirement,
  Stage,
  Task,
  User,
  sequelize,
  Sequelize,
}
