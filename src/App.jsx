import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DynamicPage from './pages/DynamicPage'
import AdminPanel from './pages/AdminPanel'

function App() {
  const [pages, setPages] = useState({})

  // Load existing pages on app start
  useEffect(() => {
    const savedPages = localStorage.getItem('dynamicPages')
    if (savedPages) {
      setPages(JSON.parse(savedPages))
    } else {
      // Create demo pages
      createDemoPages()
    }
  }, [])

  const createDemoPages = async () => {
    const demoPages = [
      {
        slug: 'about-us',
        components: [
          {
            type: 'ImageBlock',
            props: {
              src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
              alt: 'Team collaboration',
              caption: 'Our amazing team working together'
            }
          },
          {
            type: 'TextSection',
            props: {
              title: 'About Our Company',
              content: 'We are a forward-thinking company dedicated to creating innovative solutions that make a difference in people\'s lives. Our team combines creativity with technical expertise to deliver exceptional results.',
              variant: 'large'
            }
          },
          {
            type: 'StatsBox',
            props: {
              stats: [
                { label: 'Years Experience', value: '10+' },
                { label: 'Happy Clients', value: '500+' },
                { label: 'Projects Completed', value: '1000+' },
                { label: 'Team Members', value: '50+' }
              ]
            }
          },
          {
            type: 'CTA',
            props: {
              title: 'Ready to Work With Us?',
              description: 'Let\'s discuss your next project and see how we can help you achieve your goals.',
              buttonText: 'Get In Touch',
              buttonLink: '#contact',
              variant: 'primary'
            }
          }
        ]
      },
      {
        slug: 'services',
        components: [
          {
            type: 'TextSection',
            props: {
              title: 'Our Services',
              content: 'We offer a comprehensive range of services designed to help your business succeed in the digital world.',
              variant: 'centered'
            }
          },
          {
            type: 'Card',
            props: {
              title: 'Web Development',
              content: 'Custom websites and web applications built with modern technologies and best practices.',
              image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
              variant: 'horizontal'
            }
          },
          {
            type: 'Card',
            props: {
              title: 'Mobile App Development',
              content: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
              image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
              variant: 'horizontal'
            }
          },
          {
            type: 'Card',
            props: {
              title: 'Digital Marketing',
              content: 'Strategic marketing campaigns that help you reach your target audience and grow your business.',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
              variant: 'horizontal'
            }
          }
        ]
      }
    ]

    const updatedPages = {}
    demoPages.forEach(page => {
      updatedPages[page.slug] = page.components
    })
    
    setPages(updatedPages)
    localStorage.setItem('dynamicPages', JSON.stringify(updatedPages))
  }

  const handlePageCreate = (pageData) => {
    const updatedPages = {
      ...pages,
      [pageData.slug]: pageData.components
    }
    setPages(updatedPages)
    localStorage.setItem('dynamicPages', JSON.stringify(updatedPages))
    return { success: true, message: `Page '${pageData.slug}' created successfully!` }
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage pages={Object.keys(pages)} />} />
          <Route path="/admin" element={<AdminPanel onPageCreate={handlePageCreate} />} />
          <Route 
            path="/:slug" 
            element={<DynamicPage pages={pages} />} 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App