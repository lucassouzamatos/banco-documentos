'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Art = use("App/Models/Art");
const BaseController = use("App/Controllers/Http/BaseController");
const FileUpload = use("FileUpload")

/**
 * Resourceful controller for interacting with arts
 */
class ArtController extends BaseController {
  /**
   * Show a list of all arts.
   * GET arts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    const { user_id } = request.get();
    const arts = Art.query()

    if (user_id)
      arts.where("user_id", user_id)

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        arts: await arts.fetch()
      }
    });
  }

  /**
   * Create/save a new art.
   * POST arts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    let image = request.file('image', {
      types: ['image'],
      size: '10mb'
    })

    const data = request.only([
      "title",
      "description",
      "path",
      "price",
      "dimensions"
    ])

    try {
      image = await FileUpload.upload(image)
    } catch(e) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: e.message
      });
    }

    const user = await auth.getUser();
    const art = await Art.create({
      user_id: user.id,
      ...data,
      path: '/uploads/' + image.fileName
    })

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: { art }
    });
  }

  /**
   * Display a single art.
   * GET arts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const { id } = params;
    if (!id) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Arte não especificada"]
      });
    }

    const art = await Art.findBy({ id });
    if (!art) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Arte não encontrada"]
      });
    }

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: art
    });
  }

  /**
   * Update art details.
   * PUT or PATCH arts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a art with id.
   * DELETE arts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ArtController
