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
const State = use("App/Models/State");
const states = require('./states')

class StateSeeder {
  static async run () {
    await State.createMany(states)
  }

  async run () {
    await StateSeeder.run()
  }
}

module.exports = StateSeeder
