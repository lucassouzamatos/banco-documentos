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
const City = use("App/Models/City");
const cities = require('./cities')

class CitySeeder {
  static async run () {
    await City.createMany(cities)
  }

  async run () {
    await CitySeeder.run()
  }
}

module.exports = CitySeeder
