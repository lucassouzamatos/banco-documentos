'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const BaseController = use("App/Controllers/Http/BaseController");
const Interest = use("App/Models/Interest");
const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with interests
 */
class InterestController extends BaseController {
  /**
   * Show a list of all interests.
   * GET interests
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { user_id } = request.get();

    if (!user_id) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["É necessário definir um usuário"]
      });
    }

    const interests = await Interest.query()
      .with("style")
      .where("user_id", user_id)
      .fetch()

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        interests
      }
    });
  }

  /**
   * Create/save a new interest.
   * POST interests
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    let data = request.only([
      "user_id",
      "style_id",
    ])

    let user = await auth.getUser();
    if (data.user_id) {
      user = await User.find(data.user_id)
    }

    if (!user) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Usuário não encontrado"]
      });
    }
    data.user_id = user.id

    await Interest.create(data)
    const interests = await Interest.query()
      .where("user_id", user.id)
      .with("style")
      .fetch()

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: { interests }
    });
  }

  /**
   * Delete a interest with id.
   * DELETE interests/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ response, params }) {
    const interest = await Interest.find(params.id);

    if (!interest) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Não foi encontrado o interesse especificado"]
      });
    }

    await interest.delete();
    return this.responseDestroyed({ response });
  }
}

module.exports = InterestController
