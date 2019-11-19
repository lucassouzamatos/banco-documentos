'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const User = use('App/Models/User')
const Art = use('App/Models/Art')
const Notification = use('App/Models/Notification')
const ScheduleDate = use('App/Models/ScheduleDate')
const moment = require("moment");

class Scheduled extends Model {
  static boot () {
    super.boot()
    this.addHook('afterCreate', async ({ customer_id, art_id, id, schedule_date_id }) => {
      const art = await Art.query()
        .where("id", art_id)
        .with("user", builder => {
          builder.with("studioArtist")
        })
        .first()

      const { date } = await ScheduleDate.find(schedule_date_id)
      const customer = await User.find(customer_id)
      const { user } = art.$relations
      const { studioArtist } = user.$relations

      await Notification.create({
        user_id: user.id,
        scheduled_id: id,
        description: `${customer.username} solicitou um agendamento para o dia ${moment(date).format('DD/MM/YYYY')} às ${moment(date).format('HH:mm')}`
      })

      if (studioArtist) {
        await Notification.create({
          user_id: studioArtist.studio_id,
          scheduled_id: id,
          description: `${customer.username} solicitou um agendamento para o dia ${moment(date).format('DD/MM/YYYY')} às ${moment(date).format('HH:mm')}`
        })
      }
    })

    this.addHook('beforeSave', async (scheduledInstance) => {
      if (scheduledInstance.dirty.accepted) {
        const art = await Art.query()
          .where("id", scheduledInstance.art_id)
          .with("user", builder => {
            builder.with("studioArtist")
          })
          .first()

        const { user } = art.$relations
        const { studioArtist } = user.$relations
        const { date } = await ScheduleDate.find(scheduledInstance.schedule_date_id)

        await Notification.create({
          user_id: scheduledInstance.customer_id,
          scheduled_id: scheduledInstance.id,
          description: `${user.username} aceitou seu agendamento para o dia ${moment(date).format('DD/MM/YYYY')} às ${moment(date).format('HH:mm')}`
        })

        if (studioArtist) {
          await Notification.create({
            user_id: studioArtist.studio_id,
            scheduled_id: scheduledInstance.id,
            description: `${user.username} aceitou um agendamento para o dia ${moment(date).format('DD/MM/YYYY')} às ${moment(date).format('HH:mm')}`
          })
        }
      }
    })
  }

  scheduleDates () {
    return this.belongsTo('App/Models/ScheduleDate')
  }

  art () {
    return this.belongsTo('App/Models/Art')
  }

  review () {
    return this.hasOne('App/Models/Review')
  }
}

module.exports = Scheduled
