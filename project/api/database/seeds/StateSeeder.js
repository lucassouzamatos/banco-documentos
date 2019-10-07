'use strict'

/*
|--------------------------------------------------------------------------
| CitySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database')

class StateSeeder {
  static async run () {
    await Database.table('states').insert([
      {
        id: 1,
        name: 'Santa Catarina',
        uf: 'SC'
      }
    ])
  }
}

module.exports = StateSeeder
