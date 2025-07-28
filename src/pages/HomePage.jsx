import React from 'react'

const HomePage = ({ pages = [] }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Hero Section */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6 shadow-xl">
              <span className="text-3xl">🚀</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
            Page Creator
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Create and manage your pages dynamically with ease. Build beautiful, responsive websites in minutes.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{pages.length}</div>
              <div className="text-sm text-gray-500 font-medium">Pages Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">5</div>
              <div className="text-sm text-gray-500 font-medium">Component Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">∞</div>
              <div className="text-sm text-gray-500 font-medium">Possibilities</div>
            </div>
          </div>
        </div>

        {/* Pages Section */}
        <div className="max-w-none mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-12 mb-12 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">📄</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Your Pages</h2>
                  <p className="text-gray-600">Manage and explore your created pages</p>
                </div>
              </div>
              
              {pages.length > 0 && (
                <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-indigo-100 rounded-full">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                  <span className="text-indigo-700 font-medium text-sm">{pages.length} Active</span>
                </div>
              )}
            </div>

            {pages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {pages.map((slug, index) => (
                  <button
                    key={slug}
                    onClick={() => window.location.href = `/${slug}`}
                    className="group relative bg-gradient-to-br from-white to-blue-50/50 p-6 rounded-2xl border-2 border-blue-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Card Icon */}
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <span className="text-white text-lg">🌟</span>
                    </div>
                    
                    {/* Card Content */}
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 capitalize group-hover:text-indigo-600 transition-colors">
                        {slug.replace(/-/g, ' ')}
                      </h3>
                      <p className="text-indigo-600 text-sm font-medium mb-3">/{slug}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Live Page
                      </div>
                    </div>
                    
                    {/* Hover Arrow */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <span className="text-5xl">📝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">No pages yet</h3>
                <p className="text-gray-500 max-w-md mx-auto text-lg">
                  Get started by creating your first page. Use our intuitive page builder to craft beautiful, dynamic content.
                </p>
              </div>
            )}
          </div>

          {/* Create Page CTA */}
          <div className="text-center">
            <div className="inline-block p-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
              <button
                onClick={() => window.location.href = '/admin'}
                className="flex items-center space-x-4 px-8 py-6 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    Create New Page
                  </div>
                  <div className="text-gray-500 text-sm">
                    Start building your next amazing page
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/70 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visual Builder</h3>
              <p className="text-gray-600">
                Drag and drop components to create stunning pages without any coding required.
              </p>
            </div>

            <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/70 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Responsive Design</h3>
              <p className="text-gray-600">
                Your pages automatically adapt to any screen size, from mobile to desktop.
              </p>
            </div>

            <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/70 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Create and publish pages in minutes with our intuitive interface and components.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage