'use strict'
const BaseController = use('App/Controllers/Http/BaseController')
const User = use('App/Models/User')

class AuthController extends BaseController {
  constructor() {
    super()
  }

  async google({ ally, request }) {
    try {
      await ally.driver('google').redirect()
    } catch(e) {
      console.log(e)
    }

  }

  async callback({ auth, ally }) {
    const userAlly = await ally.driver('google').getUser()

    const user = await User.findOrCreate({
      email: userAlly.getEmail()
    }, {
      username: userAlly.getName(),
      email: userAlly.getEmail(),
      role: 'STUDENT',
    })
    return { token: await auth.generate(user) }
  }
}

module.exports = AuthController
