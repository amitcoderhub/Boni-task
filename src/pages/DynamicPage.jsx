import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Card from '../components/Card'
import ImageBlock from '../components/ImageBlock'
import TextSection from '../components/TextSection'
import StatsBox from '../components/StatsBox'
import CTA from '../components/CTA'

const componentMap = {
  Card,
  ImageBlock,
  TextSection,
  StatsBox,
  CTA
}

const DynamicPage = ({ pages }) => {
  const { slug } = useParams()
  const pageComponents = pages[slug]

  if (!pageComponents) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">The page "{slug}" doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* Dynamic Content */}
      <main>
        {pageComponents.map((component, index) => {
          const Component = componentMap[component.type]
          if (!Component) {
            return (
              <div key={index} className="p-4 bg-red-50 border border-red-200 m-4 rounded">
                <p className="text-red-600">Unknown component type: {component.type}</p>
              </div>
            )
          }
          return <Component key={index} {...component.props} />
        })}
      </main>
    </div>
  )
}

export default DynamicPage
