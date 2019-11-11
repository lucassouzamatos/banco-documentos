'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ArtistStyle extends Model {
  style () {
    return this.belongsTo('App/Models/Style')
  }
}

module.exports = ArtistStyle
