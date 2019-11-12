'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtSchema extends Schema {
  up () {
    this.table('arts', (table) => {
      table.integer('style_id').unsigned().references('id').inTable('styles')
    })
  }

  down () {
    this.table('arts', (table) => {
      table.dropColumn('style_id')
    })
  }
}

module.exports = ArtSchema
