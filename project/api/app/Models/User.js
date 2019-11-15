'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Schedule = use('App/Models/Style')

class User extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addHook('beforeCreate', async (userInstance) => {
      if (userInstance.role === "ARTIST") {
        Schedule.create({ user_id: userInstance.id })
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  city () {
    return this.hasOne('App/Models/City', 'city_id', 'id')
  }

  studioArtist () {
    return this.belongsTo('App/Models/StudioArtist', 'id', 'artist_id')
  }

  artistStyles () {
    return this.hasMany('App/Models/ArtistStyle')
  }

  art () {
    return this.hasMany('App/Models/Art')
  }

  schedule () {
    return this.belongsTo('App/Models/Schedule', 'id', 'user_id')
  }

  isStudio () {
    return this.role == 'STUDIO'
  }

  isArtist () {
    return this.role == 'ARTIST'
  }

  static get hidden () {
    return ['password']
  }

  static get primaryKey () {
    return 'id'
  }
}

module.exports = User
