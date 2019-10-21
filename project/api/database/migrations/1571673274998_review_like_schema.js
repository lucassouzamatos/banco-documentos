'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReviewLikeSchema extends Schema {
  up () {
    this.table('review_likes', (table) => {
      table.integer('user_id').notNullable().alter();
      table.integer('review_id').notNullable().alter();
    })
  }

  down () {
    this.table('review_likes', (table) => {

    })
  }
}

module.exports = ReviewLikeSchema
