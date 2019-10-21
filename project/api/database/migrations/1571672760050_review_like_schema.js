'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReviewLikeSchema extends Schema {
  up () {
    this.create('review_likes', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('review_id').unsigned().references('id').inTable('reviews')
      table.timestamps()
    })
  }

  down () {
    this.drop('review_likes')
  }
}

module.exports = ReviewLikeSchema
