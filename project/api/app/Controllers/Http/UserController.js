'use strict'
const User = use('App/Models/User')
const BaseController = use('App/Controllers/Http/BaseController')

class UserController extends BaseController {
  constructor() {
    super()
  }

  async auth({ request, auth, response }) {
    const { email, password } = request.all()
    const user = await User.findBy({ email });

    if (!user) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Usuário não encontrado"]
      })
    }

    const token = await auth.attempt(email, password)
    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        ...token,
        user
      }
    })
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
