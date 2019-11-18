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
const Hash = use('Hash')

class UserSeeder {
  static async run () {
    const password = await Hash.make('teste')

    await Database.table('users').insert([
      {
        username: 'Usuário Teste',
        email: 'usuario@teste.com',
        password,
        role: 'ARTIST',
        cpf: '11011011011',
        city_id: 5200050,
        address: 'Av. test, 404'
      }
    ])
  }

  async run () {
    await UserSeeder.run()
  }
}

module.exports = UserSeeder
