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

Job.hasMany(Stage)
Stage.hasOne(Job)

Job.hasMany(Task)
Task.hasOne(Job)

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
