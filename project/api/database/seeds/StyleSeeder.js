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

class StyleSeeder {
  static async run () {
    await Database.table('styles').insert([
      {
        id: 1,
        title: 'Old school'
      },
      {
        id: 2,
        title: 'Realismo'
      },
      {
        id: 3,
        title: 'Black work'
      }
    ])
  }

  async run () {
    await StyleSeeder.run()
  }
}

module.exports = StyleSeeder
