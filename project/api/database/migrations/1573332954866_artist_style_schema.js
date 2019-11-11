'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtistStyleSchema extends Schema {
  up () {
    this.create('artist_styles', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('style_id').unsigned().references('id').inTable('styles')
      table.timestamps()
    })
  }

  down () {
    this.drop('artist_styles')
  }
}

module.exports = ArtistStyleSchema
