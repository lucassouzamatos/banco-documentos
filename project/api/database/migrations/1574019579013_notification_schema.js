'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationSchema extends Schema {
  up () {
    this.table('notifications', (table) => {
      table.boolean('read').defaultTo(false)
    })
  }

  down () {
    this.table('notifications', (table) => {
      table.dropColumn('read')
    })
  }
}

module.exports = NotificationSchema
