'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Art extends Model {
  style () {
    return this.hasOne('App/Models/Style', 'style_id', 'id')
  }

  user () {
    return this.hasOne('App/Models/User', 'user_id', 'id')
  }

  static scopeNearBy (query, lat, lon, distance) {
    const haversine = `(6371 * acos(cos(radians(${Number(lat)}))
      * cos(radians(cities.lat))
      * cos(radians(cities.lon)
      - radians(${lon}))
      + sin(radians(${lat}))
      * sin(radians(cities.lat))))`

    query
      .select('arts.*', Database.raw(`${haversine} as distance`))
      .innerJoin('users', 'users.id', 'user_id')
      .innerJoin('cities', 'users.city_id', 'cities.id')
      .orderBy('distance')

    if (distance)
      query.whereRaw(`${haversine} < ${distance}`)

    return query
  }
}

module.exports = Art
