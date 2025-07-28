import React from 'react'

const Card = ({ title, content, image, variant = 'default' }) => {
  if (variant === 'horizontal') {
    return (
      <div className="bg-white p-10 rounded-4xl shadow-md overflow-hidden mb-6 flex flex-col md:flex-row">
        {image && (
          <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6  ">
            <img

              src={image}
              alt={title}
              className="w-full rounded-2xl h-48 md:h-full object-cover"
            />
          </div>
        )}
        <div className="p-6 flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg  shadow-md overflow-hidden mb-6">
      {image && (
        <img 
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{content}</p>
      </div>
    </div>
  )
}

export default Card
