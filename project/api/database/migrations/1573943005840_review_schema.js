'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReviewSchema extends Schema {
  up () {
    this.table('reviews', (table) => {
      table.integer('scheduled_id').unsigned().references('id').inTable('scheduleds')
    })
  }

  down () {
    this.table('reviews', (table) => {
      table.integer('scheduled_id').unsigned().references('id').inTable('scheduleds')
    })
  }
}

module.exports = ReviewSchema
