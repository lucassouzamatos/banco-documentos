"use strict";
const State = use("App/Models/State");
const BaseController = use("App/Controllers/Http/BaseController");

class StateController extends BaseController {
  constructor() {
    super();
  }

  async index({ response }) {
    const states = await State.query().fetch();

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        states
      }
    });
  }
}

module.exports = StateController;
