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
      "schedule_date_id"
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
    .where("customer_id", data.customer_id)
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
   * Display a single scheduled.
   * GET scheduleds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing scheduled.
   * GET scheduleds/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
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
  }

  /**
   * Delete a scheduled with id.
   * DELETE scheduleds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ScheduledController
