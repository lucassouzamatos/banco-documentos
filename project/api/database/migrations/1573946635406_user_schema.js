'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.time('business_hours_start').alter()
      table.time('business_hours_end').alter()
    })
  }

  down () {
    this.table('users', (table) => {
      table.timestamp('business_hours_end')
      table.timestamp('business_hours_start')
    })
  }
}

module.exports = UserSchema
