'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Helpers = use('Helpers')

const Art = use("App/Models/Art");
const BaseController = use("App/Controllers/Http/BaseController");

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
    const { type } = request.get();
    if (!type) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["É necessário definir o tipo de arte"]
      });
    }

    const arts = await Art.query()
      .where("type", type)
      .fetch();

  return this.responseSuccess({
    response,
    statusCode: 200,
    data: {
      arts
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
    const image = request.file('image', {
      types: ['image'],
      size: '10mb'
    })

    const data = request.only([
      "type",
      "title",
      "description",
      "path",
      "price"
    ])

    await image.move(Helpers.publicPath('uploads'), {
      name: `${Date.now()}.${image.subtype}`
    })

    if (!image.moved()) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: image.errors()
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
