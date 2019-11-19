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
   * Show a list of all scheduledates.
   * GET scheduledates
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { art_id } = request.get();
    const scheduledates = ScheduleDate.query()

    if (art_id) {
      scheduledates.whereHas("schedule", builder => {
        builder.whereHas("user", builder => {
          builder.whereHas("art", builder => {
            builder.where("id", art_id)
          })
        })
      })
      .whereDoesntHave("scheduled")
    }

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        scheduledates: await scheduledates.fetch()
      }
    });
  }
}

module.exports = ScheduleDateController
