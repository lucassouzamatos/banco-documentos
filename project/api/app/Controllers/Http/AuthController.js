'use strict'
const BaseController = use('App/Controllers/Http/BaseController')
const User = use('App/Models/User')

class AuthController extends BaseController {
  constructor() {
    super()
  }

  async google({ response, auth, request }) {
    const { email, googleId, name } = request.all()

    let user = await User.findOrCreate({
      email,
      googleId
    }, {
      email,
      googleId,
      username: name,
      role: 'CUSTOMER'
    })

    const token = await auth.generate(user);

    user = await User.query()
      .with("city", builder => {
        builder.with("state");
      })
      .withCount("notifications as notifications_unread", builder => {
        builder.where("read", false)
      })
      .where("id", user.id)
      .first()

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: {
        ...token,
        user
      }
    })
  }
}

module.exports = AuthController
