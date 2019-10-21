'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ReviewLike = use("App/Models/ReviewLike");
const BaseController = use("App/Controllers/Http/BaseController");

/**
 * Resourceful controller for interacting with reviewlikes
 */
class ReviewLikeController extends BaseController {
  /**
   * Show a list of all reviewlikes.
   * GET reviewlikes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    const { user_id, review_id } = request.get();

    if (!user_id && !review_id)
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["É necessário filtrar por usuário ou avaliação"]
      });

    const likes = ReviewLike.query()

    if (user_id)
      likes.where("user_id", user_id)

    if (review_id)
      likes.where("review_id", review_id)

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        likes: await likes.fetch()
      }
    });
  }

  /**
   * Update reviewlike details.
   * PUT or PATCH reviewlikes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a reviewlike with id.
   * DELETE reviewlikes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  /**
   * Create/save a new reviewlike.
   * POST reviewlikes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const data = request.only([
      "user_id",
      "review_id",
    ])

    const like = await ReviewLike.create(data)

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: { like }
    });
  }
}

module.exports = ReviewLikeController
