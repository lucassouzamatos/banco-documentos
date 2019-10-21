'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtSchema extends Schema {
  up () {
    this.table('arts', (table) => {
      table.dropColumn('type')
    })
  }

  down () {
    this.table('arts', (table) => {
      table.string('type', 80).notNullable()
    })
  }
}

module.exports = ArtSchema
