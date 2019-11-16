'use strict'

const { Command } = require('@adonisjs/ace')
const Schedule = use("App/Models/Schedule");
const Database = use('Database')

class SchedulesGenerate extends Command {
  static get signature () {
    return 'schedules:generate'
  }

  static get description () {
    return 'Create schedules for all artists'
  }

  async handle (args, options) {
    const users = await Database.table('users')
      .select('users.id as user_id')
      .leftJoin('schedules', 'schedules.user_id', 'users.id')
      .whereNull("schedules.user_id")
      .where("users.role", "ARTIST")

    await Schedule.createMany(users)
    this.success('All schedules created')
  }
}

module.exports = SchedulesGenerate
