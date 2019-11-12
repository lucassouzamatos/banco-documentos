'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduledSchema extends Schema {
  up () {
    this.table('scheduleds', (table) => {
      table.boolean('accepted').defaultTo(false)
    })
  }

  down () {
    this.table('scheduleds', (table) => {
      table.dropColumn('accepted')
    })
  }
}

module.exports = ScheduledSchema
