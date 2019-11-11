'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Style = use("App/Models/Style");
const BaseController = use("App/Controllers/Http/BaseController");

/**
 * Resourceful controller for interacting with styles
 */
class StyleController extends BaseController {
  /**
   * Show a list of all styles.
   * GET styles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const styles = await Style.query()
      .fetch();

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        styles
      }
    });
  }
}

module.exports = StyleController
