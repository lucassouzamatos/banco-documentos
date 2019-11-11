'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Schedule = use("App/Models/Schedule");
const BaseController = use("App/Controllers/Http/BaseController");

/**
 * Resourceful controller for interacting with schedules
 */
class ScheduleController extends BaseController {
  /**
   * Show a list of all schedules.
   * GET schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { username, studio_id } = request.get();
    const schedules = Schedule.query()

    if (studio_id) {
      schedules.whereHas("user", builder => {
        builder.whereHas("studioArtist", builder => {
          builder.where("studio_id", studio_id)
        })
      })
    }

    if (username) {
      schedules.whereHas("user", builder => {
        builder.where("username", "ILIKE", `%${username}%`)
      })
    }

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        schedules: await schedules.with("user").fetch()
      }
    });
  }

  /**
   * Create/save a new schedule.
   * POST schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let data = request.only([
      "user_id"
    ]);

    const found = await Schedule.findBy({ user_id: data.user_id })
    if (found) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Esse artista já possui agenda"]
      });
    }

    try {
      const schedule = await Schedule.create(data);
      return this.responseSuccess({
        response,
        statusCode: 200,
        data: {
          schedule
        }
      });
    } catch (e) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Ocorreu um erro ao criar o usuário", e.message]
      });
    }
  }


  /**
   * Display a single schedule.
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
        errors: ["Agenda não especificada"]
      });
    }

    const schedule = await Schedule
      .query()
      .where({ id })
      .with("user")
      .with("scheduleDates", builder => {
        builder.with("scheduled")
      })
      .first();

    if (!schedule) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Agenda não encontrada"]
      });
    }

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: schedule
    });
  }

}

module.exports = ScheduleController
