import React from 'react'

const ImageBlock = ({ src, alt, caption }) => {
  return (
    <div className="mb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <img
            src={src}
            alt={alt}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
          {caption && (
            <p className="text-center text-gray-600 mt-4 italic">{caption}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageBlock