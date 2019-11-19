'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduledSchema extends Schema {
  up () {
    this.table('scheduleds', (table) => {
      table.integer('art_id').unsigned().references('id').inTable('arts')
    })
  }

  down () {
    this.table('scheduleds', (table) => {
      table.integer('art_id').unsigned().references('id').inTable('arts')
    })
  }
}

module.exports = ScheduledSchema
