"use strict";
const City = use("App/Models/City");
const BaseController = use("App/Controllers/Http/BaseController");

class CityController extends BaseController {
  constructor() {
    super();
  }

  async index({ request, response }) {
    const { state_id } = request.get();

    const cities = await City.query()
      .where("state_id", state_id)
      .fetch();

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        cities
      }
    });
  }
}

module.exports = CityController;
