'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [currentImage, setCurrentImage] = useState('')
  const [remainingImages, setRemainingImages] = useState<string[]>([])

  useEffect(() => {
    // Load images from the folder and shuffle them
    const images = [''] //getRandomImages(PHOTOS_FOLDER_PATH)
    setRemainingImages(images)
    setCurrentImage(images[0])
  }, [])

  useEffect(() => {
    if (remainingImages.length > 0) {
      // Change the image every 5 seconds (adjust as needed)
      const interval = setInterval(() => {
        setRemainingImages((prev) => {
          const newRemaining = prev.slice(1)
          setCurrentImage(newRemaining[0] || '') // Display the next image or stop if no images left
          return newRemaining
        })
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [remainingImages])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {currentImage ? (
        <img
          src={`file://${currentImage}`}
          alt="Display"
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      ) : (
        <p>No more images to display.</p>
      )}
    </div>
  )
}
