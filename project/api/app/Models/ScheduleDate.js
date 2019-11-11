'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ScheduleDate extends Model {
  scheduled () {
    return this.belongsTo('App/Models/Scheduled', 'id')
  }
}

module.exports = ScheduleDate
