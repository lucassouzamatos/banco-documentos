'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduledSchema extends Schema {
  up () {
    this.table('scheduleds', (table) => {
      table.boolean('accepted').alter()
    })
  }

  down () {
    this.table('scheduleds', (table) => {
      table.boolean('accepted').defaultTo(false)
    })
  }
}

module.exports = ScheduledSchema
