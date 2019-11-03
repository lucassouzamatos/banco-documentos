'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleDateSchema extends Schema {
  up () {
    this.create('schedule_dates', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('schedule_dates')
  }
}

module.exports = ScheduleDateSchema
