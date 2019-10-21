'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReviewSchema extends Schema {
  up () {
    this.create('reviews', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('title').notNullable()
      table.string('description')
      table.string('path')
      table.timestamps()
    })
  }

  down () {
    this.drop('reviews')
  }
}

module.exports = ReviewSchema
