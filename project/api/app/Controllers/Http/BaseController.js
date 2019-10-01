'use strict'

class BaseController {
  constructor () {}

  async responseError({ response, statusCode, errors }) {
    return response.status(statusCode).send({
      errors
    })
  }

  async responseSuccess({ response, statusCode, data }) {
    return response.status(statusCode).send({
      data
    })
  }

  async responseCreated({ data }) {
    return this.responseSuccess({ statusCode, data })
  }

  async responseDestroyed() {
    return response.status(204)
  }
}

module.exports = BaseController
