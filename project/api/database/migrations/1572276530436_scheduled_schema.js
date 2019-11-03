'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduledSchema extends Schema {
  up () {
    this.create('scheduleds', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('scheduleds')
  }
}

module.exports = ScheduledSchema
