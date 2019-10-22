'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StyleSchema extends Schema {
  up () {
    this.create('styles', (table) => {
      table.increments()
      table.string('title')
      table.timestamps()
    })
  }

  down () {
    this.drop('styles')
  }
}

module.exports = StyleSchema
