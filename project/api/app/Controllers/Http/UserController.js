"use strict";
const User = use("App/Models/User");
const BaseController = use("App/Controllers/Http/BaseController");
const FileUpload = use("FileUpload")

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
    const { role, username } = request.get();

    const users = User.query()
      .with("city", builder => {
        builder.with("state");
      })
      .with("artistStyles", builder => {
        builder.with("style")
      })
      .with("interests", builder => {
        builder.with("style")
      })

    if (role) {
      users.where("role", role)
    }

    if (username) {
      users.where("username", "ILIKE", `%${username}%`)
    }

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        users: await users.fetch()
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
          .with("artistStyles", builder => {
            builder.with("style")
          })
          .with("interests", builder => {
            builder.with("style")
          })
          .first()
      }
    });
  }

  async store({ response, request }) {
    let data = request.only([
      "username",
      "email",
      "password",
      "role",
      "cpf",
      "cnpj",
      "address",
      "city_id"
    ]);

    let image = request.file('image', {
      types: ['image'],
      size: '10mb'
    })

    const userExists = await User.findBy({ email: data.email })
    if (userExists) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: [
          "Esse email já foi cadastrado"
        ]
      });
    }

    if (image) {
      try {
        image = await FileUpload.upload(image)
        data = { ...data, avatar: '/uploads/' + image.fileName }
      } catch(e) {
        return this.responseError({
          response,
          statusCode: 400,
          errors: e.message
        });
      }
    }

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
    const user = await User.find(params.id);

    if (!user) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Usuário não encontrado"]
      });
    }

    let data = request.only([
      "username",
      "email",
      "password",
      "cpf",
      "cnpj",
      "address",
      "city_id"
    ]);

    let image = request.file('image', {
      types: ['image'],
      size: '10mb'
    })

    if (data.email) {
      const userExists = await User.query()
      .where("id", "<>", params.id)
      .where("email", data.email)
      .first()

      if (userExists) {
        return this.responseError({
          response,
          statusCode: 400,
          errors: [
            "Esse email já foi cadastrado"
          ]
        });
      }
    }

    if (image) {
      try {
        image = await FileUpload.upload(image)
        data = { ...data, avatar: '/uploads/' + image.fileName }
      } catch(e) {
        return this.responseError({
          response,
          statusCode: 400,
          errors: e.message
        });
      }
    }

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
