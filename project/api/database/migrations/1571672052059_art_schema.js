'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtSchema extends Schema {
  up () {
    this.table('arts', (table) => {
      table.string('dimensions')
    })
  }

  down () {
    this.table('arts', (table) => {
      table.dropColumn('dimensions')
    })
  }
}

module.exports = ArtSchema
