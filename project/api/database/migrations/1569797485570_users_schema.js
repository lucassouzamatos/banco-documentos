'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('role', 80).notNullable()
      table.string('cpf', 11)
      table.string('cnpj', 14)
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('role')
      table.dropColumn('cpf')
      table.dropColumn('cnpj')
    })
  }
}

module.exports = UsersSchema
