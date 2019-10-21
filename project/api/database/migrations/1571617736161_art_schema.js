'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArtSchema extends Schema {
  up () {
    this.create('arts', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('type', 80).notNullable()
      table.string('title').notNullable()
      table.string('description')
      table.string('path')
      table.string('price')
      table.timestamps()
    })
  }

  down () {
    this.drop('arts')
  }
}

module.exports = ArtSchema
