'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitySchema extends Schema {
  up () {
    this.table('cities', (table) => {
      table.float("lat")
      table.float("lon")
    })
  }

  down () {
    this.table('cities', (table) => {
      table.dropColumn("lon")
      table.dropColumn("lon")
    })
  }
}

module.exports = CitySchema
