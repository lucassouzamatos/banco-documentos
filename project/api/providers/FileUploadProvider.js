'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class FileUploadProvider extends ServiceProvider {
  register () {
    this.app.singleton('FileUpload', () => {
      const Helpers = this.app.use('Helpers')
      return new FileUploadService(Helpers)
    })
  }
}

class FileUploadService {
  constructor(Helpers) {
    this.Helpers = Helpers
  }

  async upload(image) {
    await image.move(this.Helpers.publicPath('uploads'), {
      name: `${Date.now()}.${image.subtype}`
    })


    if (!image.moved()) {
      throw new Error("Não foi possível mover a imagem")
    }

    return image
  }
}

module.exports = FileUploadProvider
