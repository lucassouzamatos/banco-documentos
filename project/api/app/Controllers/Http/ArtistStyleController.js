'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const BaseController = use("App/Controllers/Http/BaseController");
const ArtistStyle = use("App/Models/ArtistStyle");
const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with artiststyles
 */
class ArtistStyleController extends BaseController {
  /**
   * Show a list of all artiststyles.
   * GET artiststyles
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
        errors: ["É necessário definir o artista"]
      });
    }

    const artistStyles = await ArtistStyle.query()
      .with("style")
      .where("user_id", user_id)
      .fetch()

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        artistStyles
      }
    });
  }

  /**
   * Create/save a new artiststyle.
   * POST artiststyles
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

    if (!user.isArtist()) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["O usuário especificado não é um artista"]
      });
    }

    if (!user) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Artista não encontrado"]
      });
    }
    data.user_id = user.id
    const artistStyle = await ArtistStyle.create(data)

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: { artistStyle }
    });
  }

  /**
   * Delete a artiststyle with id.
   * DELETE artiststyles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const artistStyle = await ArtistStyle.find(params.id);

    if (!artistStyle) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Não foi encontrado o vínculo especificado"]
      });
    }

    await artistStyle.delete();
    return this.responseDestroyed({ response });
  }
}

module.exports = ArtistStyleController
