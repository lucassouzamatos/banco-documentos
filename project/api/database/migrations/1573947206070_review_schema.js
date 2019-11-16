'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReviewSchema extends Schema {
  up () {
    this.table('reviews', (table) => {
      table.integer('score')
    })
  }

  down () {
    this.table('reviews', (table) => {
      table.integer('score')
    })
  }
}

module.exports = ReviewSchema
