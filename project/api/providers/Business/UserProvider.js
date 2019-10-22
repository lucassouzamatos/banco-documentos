'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class UserProvider extends ServiceProvider {
  register () {
    this.app.singleton('UserBusiness', () => {
      const StudioArtist = this.app.use('App/Models/StudioArtist')
      return new UserBusiness(StudioArtist)
    })
  }
}

class UserBusiness {
  constructor(StudioArtist) {
    this.StudioArtist = StudioArtist
  }

  async belongsToStudio(user, currentUser) {
    if (currentUser.isStudio()) {
      return await this.StudioArtist
        .query()
        .where("artist_id", user.id)
        .where("studio_id", currentUser.id)
        .first()
    }

    return false
  }
}

module.exports = UserProvider
