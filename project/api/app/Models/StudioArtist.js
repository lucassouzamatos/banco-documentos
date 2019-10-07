'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class StudioArtist extends Model {
  artist () {
    return this.hasOne('App/Models/User', 'artist_id', 'id')
  }
}

module.exports = StudioArtist
