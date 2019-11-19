'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const User = use('App/Models/User')

class Schedule extends Model {
  scheduleDates () {
    return this.hasMany('App/Models/ScheduleDate', 'id', 'schedule_id')
  }

  user () {
    return this.hasOne('App/Models/User', 'user_id', 'id')
  }
}

module.exports = Schedule
