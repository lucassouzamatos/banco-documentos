'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Notification = use("App/Models/Notification");
const BaseController = use("App/Controllers/Http/BaseController");

/**
 * Resourceful controller for interacting with notifications
 */
class NotificationController extends BaseController {
  constructor() {
    super();
  }

  /**
   * Show a list of all notifications.
   * GET notifications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, response }) {
    const user = await auth.getUser()

    const notifications = await Notification.query()
      .where("user_id", user.id)
      .with("scheduled")
      .fetch()

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        notifications
      }
    });
  }

  /**
   * Update notifications details.
   * PUT or PATCH notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const data = request.only([
      "read"
    ])
    const user = await auth.getUser()

    const notification = await Notification.findOrFail(params.id);

    if (!notification) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Notificação não encontrada"]
      });
    }

    if (notification.user_id !== user.id) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Sem permissão para alterar essa notificação"]
      });
    }

    await notification.merge(data);
    await notification.save();

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        notification
      }
    });
  }
}

module.exports = NotificationController
