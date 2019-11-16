'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const User = use('App/Models/User')

class Schedule extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (schedule) => {
      const user = await User.find(schedule.dirty.user_id)
      if (!user) {
        throw new Error('É necessário definir um artista')
      }

      if (!user.isArtist())
        throw new Error('É necessário ser um artista')
    })
  }

  scheduleDates () {
    return this.hasMany('App/Models/ScheduleDate', 'id', 'schedule_id')
  }

  user () {
    return this.hasOne('App/Models/User', 'user_id', 'id')
  }
}

module.exports = Schedule
