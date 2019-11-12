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
    const { id, user_id } = params;
    if (!id && !user_id) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Agenda ou usuário não especificado(a)"]
      });
    }

    const schedule = Schedule
      .query()
      .with("user", builder => {
        builder.with("artistStyles", builder => {
          builder.with("style")
        })
      })
      .with("scheduleDates", builder => {
        builder.with("scheduled")
      })

    if (id) {
      schedule.where({ id })
    }

    if (user_id) {
      schedule.where("user_id", user_id)
    }

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
      data: await schedule.first()
    });
  }

}

module.exports = ScheduleController
