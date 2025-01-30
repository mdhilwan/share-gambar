const fs = require('fs')
const path = require('path')

/**
 * Get a list of image files from a folder and shuffle them.
 * @param folderPath - The path to the folder containing images.
 * @returns An array of shuffled image filenames.
 */
function getRandomImages(folderPath) {
  // Read all files from the folder
  const files = fs.readdirSync(folderPath)

  // Filter only image files (you can add more extensions if needed)
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  const images = files.filter((file) =>
    imageExtensions.includes(path.extname(file).toLowerCase())
  )
  // Read the byte data of each image and convert it to a base64-encoded string
  const imageData = images.map((filename) => {
    const filePath = path.join(folderPath, filename)
    const data = fs.readFileSync(filePath) // Read the file as a Buffer
    return { filename, data: data }
  })

  // Shuffle the images array
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[images[i], images[j]] = [images[j], images[i]]
  }

  return imageData
}

module.exports = getRandomImages
