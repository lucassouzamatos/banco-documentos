'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SheduledSchema extends Schema {
  up () {
    this.table('scheduleds', (table) => {
      table.integer('schedule_date_id').unsigned().references('id').inTable('schedule_dates')
      table.integer('customer_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.table('scheduleds', (table) => {
      table.dropColumn('schedule_date_id')
      table.dropColumn('customer_id')
    })
  }
}

module.exports = SheduledSchema
