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

class CitySeeder {
  static async run () {
    await Database.table('cities').insert([
      {
        name: 'Tubarão',
        state_id: 1
      }
    ])
  }

  async run () {
    await CitySeeder.run()
  }
}

module.exports = CitySeeder
