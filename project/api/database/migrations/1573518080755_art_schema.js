'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtSchema extends Schema {
  up () {
    this.table('arts', (table) => {
      table.string('duration', 80)
    })
  }

  down () {
    this.table('arts', (table) => {
      table.dropColumn('duration', 80)
    })
  }
}

module.exports = ArtSchema
