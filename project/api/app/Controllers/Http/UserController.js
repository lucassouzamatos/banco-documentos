'use strict'
const User = use('App/Models/User')

class UserController {
  async auth() {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)

    return token
  }

  async index () {
    const users = User.all()
    return users
  }

  async show ({ params }) {
    return await User.findOrFail(params.id)
  }

  async store({ request }) {
    const data = request.only([
      "username",
      "email",
      "password",
      "role",
      "cpf",
      "cnpj",
      "address",
      "city_id",
    ]);

    const user = await User.create(data)
    return user
  }

  async update({ params, request }) {
    const user = await User.findOrFail(params.id)

    const data = request.only([
      "username",
      "email",
      "password",
      "role",
      "cpf",
      "cnpj",
      "address",
      "city_id"
    ]);
    await user.merge({ ...data })
    await user.save()

    return user
  }
}

module.exports = UserController
