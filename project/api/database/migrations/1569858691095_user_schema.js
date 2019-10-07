'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.integer('city_id').unsigned().references('id').inTable('cities')
      table.string('address')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('city_id')
      table.dropColumn('address')
    })
  }
}

module.exports = UserSchema
