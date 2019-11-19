'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduledSchema extends Schema {
  up () {
    this.table('scheduleds', (table) => {
      table.boolean('done').defaultTo(false)
    })
  }

  down () {
    this.table('scheduleds', (table) => {
      table.dropColumn('done')
    })
  }
}

module.exports = ScheduledSchema
