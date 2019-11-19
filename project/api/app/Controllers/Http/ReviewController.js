'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Review = use("App/Models/Review");
const Scheduled = use("App/Models/Scheduled");
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
  async index ({ request, response, auth }) {
    const { user_id } = request.get();
    const user = await auth.getUser()

    let reviews = Review.query()

    if (user_id)
      reviews.where("user_id", user_id)

    reviews
      .withCount("likes")
      .withCount("likes as liked", builder => {
        builder.where("user_id", user.id)
      })

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
      "scheduled_id",
      "score"
    ])

    if (!data.scheduled_id) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: [
          "É necessário definir o agendamento"
        ]
      });
    }

    const scheduled = await Scheduled.query()
      .where("id", data.scheduled_id)
      .first()

    if (!scheduled) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: [
          "O agendamento não existe"
        ]
      });
    }

    if (!scheduled.done) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: [
          "Esse agendamento ainda não foi finalizado"
        ]
      });
    }

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
  async show ({ params, auth, response }) {
    const { id } = params;
    const user = await auth.getUser()

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
      .withCount("likes")
      .withCount("likes as liked", builder => {
        builder.where("user_id", user.id)
      })
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
    let data = request.only([
      "title",
      "description",
      "scheduled_id",
      "score"
    ])

    const review = await Review.findOrFail(params.id);

    if (!review) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Avaliação não encontrada"]
      });
    }

    let image = request.file('image', {
      types: ['image'],
      size: '10mb'
    })

    if (image) {
      try {
        image = await FileUpload.upload(image)
        data = {
          ...data,
          path: '/uploads/' + image.fileName
        }
      } catch(e) {
        return this.responseError({
          response,
          statusCode: 400,
          errors: e.message
        });
      }
    }

    await review.merge(data);
    await review.save();

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        review
      }
    });
  }

}

module.exports = ReviewController
