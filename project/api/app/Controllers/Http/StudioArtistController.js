'use strict'
const BaseController = use('App/Controllers/Http/BaseController')
const StudioArtist = use('App/Models/StudioArtist')
const User = use('App/Models/User')

class StudioArtistController extends BaseController {
  constructor() {
    super()
  }

  async index({ response, params }) {
    if (!params.studioId) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["O id do estúdio não foi especificado"]
      })
    }

    const studio = await User.find(params.studioId)

    if (!studio) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["O estúdio não foi encontrado"]
      })
    }

    if (studio.role !== 'STUDIO') {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["O id especificado não é de um estúdio"]
      })
    }

    return this.responseSuccess({
      response,
      statusCode: 200,
      data: await StudioArtist
        .query()
        .where('studio_id', studio.id)
        .with('artist')
        .fetch()
    })
  }

  async store({ request, response }) {
    const { studio_id, artist_id } = request.only([
      "studio_id",
      "artist_id"
    ]);

    const studio = await User.find(studio_id)
    const artist = await User.find(artist_id)

    if (!studio) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Não foi possível encontrar o estúdio especificado"]
      })
    }

    if (!artist) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Não foi possível encontrar o artista especificado"]
      })
    }

    if (studio.role !== 'STUDIO') {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["O id especificado não é de um estúdio"]
      })
    }

    if (artist.role !== 'ARTIST') {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["O id especificado não é de um artista"]
      })
    }

    const studioArtist = await StudioArtist.findOrCreate({ studio_id, artist_id }, { studio_id, artist_id })
    return this.responseSuccess({
      response,
      statusCode: 200,
      data: studioArtist
    })
  }

  async destroy({ response, params }) {
    const studioArtist = await StudioArtist.find(params.id);

    if (!studioArtist) {
      return this.responseError({
        response,
        statusCode: 400,
        errors: ["Não foi encontrado o vínculo"]
      })
    }

    await studioArtist.delete()
    return this.responseDestroyed({ response });
  }
}

module.exports = StudioArtistController
