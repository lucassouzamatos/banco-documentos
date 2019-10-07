'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('password', 60).alter()
    })
  }

  down () {
    this.table('users', (table) => {
      table.string('password', 60).notNullable()
    })
  }
}

module.exports = UserSchema
