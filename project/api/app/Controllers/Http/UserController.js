"use strict";
const User = use("App/Models/User");
const BaseController = use("App/Controllers/Http/BaseController");

class UserController extends BaseController {
  constructor() {
    super();
  }

  async auth({ request, auth, response }) {
    const { email, password } = request.all();
    const user = await User.findBy({ email });

    if (!user) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Usuário não encontrado"]
      });
    }

    const token = await auth.attempt(email, password);
    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        ...token,
        user
      }
    });
  }

  async index({ response, request }) {
    const { role } = request.get();

    const users = await User.query()
      .where("role", role || null)
      .with("city", builder => {
        builder.with("state");
      })
      .fetch();

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        users
      }
    });
  }

  async show({ response, auth, params }) {
    if (params.id === "me") {
      const user = await auth.getUser();

      return this.responseSuccess({
        response,
        statusCode: 200,
        data: {
          user: await User.query()
            .with("city")
            .where("id", user.id)
            .first()
        }
      });
    }

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        user: await User.query()
          .with("city")
          .where("id", params.id)
          .first()
      }
    });
  }

  async store({ response, request }) {
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

    const user = await User.create(data);
    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        user: await User.query()
          .with("city")
          .where("id", user.id)
          .first()
      }
    });
  }

  async update({ response, params, request }) {
    const user = await User.findOrFail(params.id);

    if (!user) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Usuário não encontrado"]
      });
    }

    const data = request.only([
      "username",
      "email",
      "password",
      "cpf",
      "cnpj",
      "address",
      "city_id"
    ]);
    await user.merge({ ...data });
    await user.save();

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        user: await User.query()
          .with("city")
          .where("id", user.id)
          .first()
      }
    });
  }
}

module.exports = UserController;
