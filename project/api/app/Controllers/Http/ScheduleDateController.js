'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ScheduleDate = use("App/Models/ScheduleDate");
const BaseController = use("App/Controllers/Http/BaseController");

/**
 * Resourceful controller for interacting with scheduledates
 */
class ScheduleDateController extends BaseController {
  /**
   * Create/save a new scheduledate.
   * POST scheduledates
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([
      "date",
      "schedule_id"
    ])

    const scheduleDateExists = await ScheduleDate.query()
      .where("schedule_id", data.schedule_id)
      .where("date", data.date)
      .first()

    if (scheduleDateExists) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Essa data já foi definida na agenda"]
      });
    }

    const scheduleDate = await ScheduleDate.create(data)
    return this.responseSuccess({
      response,
      statusCode: 200,
      data: { scheduleDate }
    });
  }

  /**
   * Display a single scheduledate.
   * GET scheduledates/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing scheduledate.
   * GET scheduledates/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update scheduledate details.
   * PUT or PATCH scheduledates/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a scheduledate with id.
   * DELETE scheduledates/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ScheduleDateController
