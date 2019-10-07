'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudioArtistSchema extends Schema {
  up () {
    this.create('studio_artists', (table) => {
      table.increments()
      table.integer('artist_id').unsigned().references('id').inTable('users')
      table.integer('studio_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('studio_artists')
  }
}

module.exports = StudioArtistSchema
