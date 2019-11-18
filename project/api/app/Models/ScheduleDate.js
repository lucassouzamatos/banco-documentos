'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ScheduleDate extends Model {
  schedule () {
    return this.hasOne('App/Models/Schedule', 'schedule_id', 'id')
  }

  scheduled () {
    return this.hasOne('App/Models/Scheduled')
  }
}

module.exports = ScheduleDate
