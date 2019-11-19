'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.timestamp('business_hours_start')
      table.timestamp('business_hours_end')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('business_hours_start')
      table.dropColumn('business_hours_end')
    })
  }
}

module.exports = UserSchema
