'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Scheduled = use("App/Models/Scheduled");
const BaseController = use("App/Controllers/Http/BaseController");

/**
 * Resourceful controller for interacting with scheduleds
 */
class ScheduledController extends BaseController {
  async index({ response, request }) {
    const { artist_id, customer_id } = request.get();

    const scheduleds = Scheduled.query()
      .with("art")

    if (customer_id) {
      scheduleds
        .where("customer_id", customer_id)
        .whereDoesntHave("review")
    }

    if (artist_id) {
      scheduleds.whereHas("scheduleDates", builder => {
        builder.whereHas("schedule", builder => {
          builder.where("user_id", artist_id)
        })
      })
    }

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        scheduleds: await scheduleds.fetch()
      }
    });
  }

  /**
   * Create/save a new scheduled.
   * POST scheduleds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([
      "customer_id",
      "schedule_date_id",
      "art_id"
    ])

    if (!data.customer_id) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["É necessário definir o cliente"]
      });
    }

    if (!data.schedule_date_id) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["É necessário definir a data"]
      });
    }

    const scheduledExists = await Scheduled.query()
      .where("schedule_date_id", data.schedule_date_id)
      .first()

    if (scheduledExists) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Esse horário já foi agendado"]
      });
    }

    const scheduled = await Scheduled.create(data)
    return this.responseSuccess({
      response,
      statusCode: 200,
      data: { scheduled }
    });
  }

  /**
   * Update scheduled details.
   * PUT or PATCH scheduleds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only([
      "done",
      "accepted",
    ])

    const scheduled = await Scheduled.findOrFail(params.id);

    if (!scheduled) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Agendamento não encontrado"]
      });
    }

    await scheduled.merge(data);
    await scheduled.save();

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        scheduled
      }
    });
  }
}

module.exports = ScheduledController
