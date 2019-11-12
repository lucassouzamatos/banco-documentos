'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Art extends Model {
  style () {
    return this.hasOne('App/Models/Style', 'style_id', 'id')
  }
}

module.exports = Art
