const express = require('express')
const getRandomImages = require('../imageLoader')
const router = express.Router()
const zlib = require('zlib')

let randomImages = getRandomImages(process.env.IMAGES_FOLDER)
let i = 0

module.exports = () => {
  router.get('/', async (req, res) => {
    zlib.gzip(randomImages[i].data, (err, compressedData) => {
      if (err) {
        console.error(err)
        res.status(500).send('Error compressing image')
        return
      }
      res.setHeader('Content-Type', 'image/jpeg')
      res.setHeader('Content-Encoding', 'gzip')
      res.send(compressedData)
    })

    if (i < randomImages.length - 1) {
      i++
    } else {
      randomImages = getRandomImages(process.env.IMAGES_FOLDER)
      i = 0
    }
  })

  return router
}
