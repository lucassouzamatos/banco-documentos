'use strict';

const CitySeeder = require('./CitySeeder')
const StateSeeder = require('./StateSeeder')
const UserSeeder = require('./UserSeeder')

class DatabaseSeeder {
  async run() {
    await StateSeeder.run()
    await CitySeeder.run()
    await UserSeeder.run()
  }
}

module.exports = DatabaseSeeder
