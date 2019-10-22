'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('avatar')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('avatar')
    })
  }
}

module.exports = UserSchema
