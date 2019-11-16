'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Scheduled extends Model {
  scheduleDates () {
    return this.belongsTo('App/Models/ScheduleDate')
  }

  art () {
    return this.belongsTo('App/Models/Art')
  }
}

module.exports = Scheduled
