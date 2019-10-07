"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class City extends Model {
  state() {
    return this.hasOne("App/Models/State", "state_id", "id");
  }
}

module.exports = City;
