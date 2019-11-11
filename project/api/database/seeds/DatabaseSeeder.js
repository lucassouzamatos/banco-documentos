'use strict';

const CitySeeder = require('./CitySeeder')
const StateSeeder = require('./StateSeeder')
const UserSeeder = require('./UserSeeder')
const StyleSeeder = require('./StyleSeeder')

class DatabaseSeeder {
  async run() {
    await StateSeeder.run()
    await CitySeeder.run()
    await UserSeeder.run()
    await StyleSeeder.run()
  }
}

module.exports = DatabaseSeeder
