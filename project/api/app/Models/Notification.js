'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {
  scheduled () {
    return this.hasOne('App/Models/Scheduled', 'scheduled_id', 'id')
  }
}

module.exports = Notification
