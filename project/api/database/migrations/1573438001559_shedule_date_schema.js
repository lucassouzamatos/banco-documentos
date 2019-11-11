'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SheduleDateSchema extends Schema {
  up () {
    this.table('schedule_dates', (table) => {
      table.timestamp('date')
      table.integer('schedule_id').unsigned().references('id').inTable('schedules')
    })
  }

  down () {
    this.table('schedule_dates', (table) => {
      table.dropColumn('date')
      table.dropColumn('style_id')
    })
  }
}

module.exports = SheduleDateSchema
