import React from 'react'

const TextSection = ({ title, content, variant = 'default' }) => {
  const containerClass = variant === 'centered' 
    ? 'text-center' 
    : variant === 'large' 
      ? 'max-w-4xl' 
      : 'max-w-3xl'

  const titleClass = variant === 'large' 
    ? 'text-4xl md:text-5xl font-bold text-gray-900 mb-6'
    : 'text-2xl md:text-3xl font-bold text-gray-900 mb-4'

  const contentClass = variant === 'large'
    ? 'text-lg text-gray-600 leading-relaxed'
    : 'text-gray-600 leading-relaxed'

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className={`mx-auto ${containerClass}`}>
          <h2 className={titleClass}>{title}</h2>
          <p className={contentClass}>{content}</p>
        </div>
      </div>
    </div>
  )
}

export default TextSection