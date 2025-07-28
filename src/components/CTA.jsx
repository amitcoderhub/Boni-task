import React from 'react'

const CTA = ({ title, description, buttonText, buttonLink, variant = 'primary' }) => {
  const bgClass = variant === 'primary' 
    ? 'bg-blue-600' 
    : variant === 'secondary' 
      ? 'bg-gray-800' 
      : 'bg-indigo-600'

  const buttonClass = variant === 'primary'
    ? 'bg-white text-blue-600 hover:bg-gray-100'
    : 'bg-white text-gray-800 hover:bg-gray-100'

  return (
    <div className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            {description}
          </p>
          <a
            href={buttonLink}
            className={`inline-flex items-center px-8 py-4 ${buttonClass} font-semibold rounded-lg transition-colors`}
          >
            {buttonText}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CTA