const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for pages (in production, use a database)
let pages = {};

// Load existing pages from file on startup
const loadPages = async () => {
  try {
    const data = await fs.readFile('pages.json', 'utf8');
    pages = JSON.parse(data);
    console.log('Loaded existing pages:', Object.keys(pages));
  } catch (error) {
    console.log('No existing pages file found, starting fresh');
    pages = {};
  }
};

// Save pages to file
const savePages = async () => {
  try {
    await fs.writeFile('pages.json', JSON.stringify(pages, null, 2));
    console.log('Pages saved to file');
  } catch (error) {
    console.error('Error saving pages:', error);
  }
};

// API Routes
app.post('/api/pages', async (req, res) => {
  try {
    const { slug, components } = req.body;

    // Validation
    if (!slug || !components) {
      return res.status(400).json({ 
        error: 'Missing required fields: slug and components' 
      });
    }

    if (!Array.isArray(components)) {
      return res.status(400).json({ 
        error: 'Components must be an array' 
      });
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return res.status(400).json({ 
        error: 'Slug must contain only lowercase letters, numbers, and hyphens' 
      });
    }

    // Valid component types
    const validComponents = ['Card', 'ImageBlock', 'TextSection', 'StatsBox', 'CTA'];
    
    // Validate components
    for (const component of components) {
      if (!component.type || !validComponents.includes(component.type)) {
        return res.status(400).json({ 
          error: `Invalid component type: ${component.type}. Valid types: ${validComponents.join(', ')}` 
        });
      }
      if (!component.props || typeof component.props !== 'object') {
        return res.status(400).json({ 
          error: 'Each component must have props object' 
        });
      }
    }

    // Store the page
    pages[slug] = components;
    await savePages();

    console.log(`Created page: ${slug} with ${components.length} components`);

    res.status(201).json({ 
      success: true,
      message: `Page '${slug}' created successfully`,
      slug: slug,
      componentsCount: components.length
    });

  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Get all pages
app.get('/api/pages', (req, res) => {
  const pageList = Object.keys(pages).map(slug => ({
    slug,
    componentsCount: pages[slug].length
  }));

  res.json({
    pages: pageList,
    total: pageList.length
  });
});

// Get specific page
app.get('/api/pages/:slug', (req, res) => {
  const { slug } = req.params;
  
  if (!pages[slug]) {
    return res.status(404).json({ 
      error: `Page '${slug}' not found` 
    });
  }

  res.json({
    slug,
    components: pages[slug]
  });
});

// Delete page
app.delete('/api/pages/:slug', async (req, res) => {
  const { slug } = req.params;
  
  if (!pages[slug]) {
    return res.status(404).json({ 
      error: `Page '${slug}' not found` 
    });
  }

  delete pages[slug];
  await savePages();

  res.json({ 
    success: true,
    message: `Page '${slug}' deleted successfully` 
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    pagesCount: Object.keys(pages).length
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error' 
  });
});

// Start server
const startServer = async () => {
  await loadPages();
  app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer().catch(console.error);

module.exports = app;
