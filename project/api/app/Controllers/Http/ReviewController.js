'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Review = use("App/Models/Review");
const FileUpload = use("FileUpload")
const BaseController = use("App/Controllers/Http/BaseController");

/**
 * Resourceful controller for interacting with reviews
 */
class ReviewController extends BaseController {
  /**
   * Show a list of all reviews.
   * GET reviews
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { user_id } = request.get();

    let reviews = Review.query()

    if (user_id)
      reviews.where("user_id", user_id)

    reviews.withCount("likes")

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        reviews: await reviews.fetch()
      }
    });
  }

  /**
   * Create/save a new review.
   * POST reviews
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
    const review = await Review.create({
      user_id: user.id,
      ...data,
      path: '/uploads/' + image.fileName
    })

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: { review }
    });
  }

  /**
   * Display a single review.
   * GET reviews/:id
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
        errors: ["Avaliação não especificada"]
      });
    }

    const review = await Review
      .query()
      .where({ id })
      .with("user")
      .first();

    if (!review) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Avaliação não encontrada"]
      });
    }

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: review
    });
  }

  /**
   * Update review details.
   * PUT or PATCH reviews/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a review with id.
   * DELETE reviews/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ReviewController
