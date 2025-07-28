const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let pages = {};

// Load existing pages from file
const loadPages = async () => {
  try {
    const filePath = path.join(__dirname, 'pages.json');
    const data = await fs.readFile(filePath, 'utf8');
    pages = JSON.parse(data);
    console.log('Loaded pages:', Object.keys(pages));
  } catch (err) {
    console.log('No existing file found. Starting fresh.');
    pages = {};
  }
};

// Save pages to file
const savePages = async () => {
  try {
    const filePath = path.join(__dirname, 'pages.json');
    await fs.writeFile(filePath, JSON.stringify(pages, null, 2));
    console.log('Pages saved.');
  } catch (err) {
    console.error('Error saving pages:', err);
  }
};

// POST /api/pages - Create/Update a page
app.post('/api/pages', async (req, res) => {
  try {
    const { slug, components } = req.body;

    if (!slug || !components) {
      return res.status(400).json({ error: 'Missing slug or components' });
    }

    if (!Array.isArray(components)) {
      return res.status(400).json({ error: 'Components must be an array' });
    }

    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug)) {
      return res.status(400).json({
        error: 'Slug must contain only lowercase letters, numbers, and hyphens',
      });
    }

    const validComponents = ['Card', 'ImageBlock', 'TextSection', 'StatsBox', 'CTA'];
    for (const component of components) {
      if (!component.type || !validComponents.includes(component.type)) {
        return res.status(400).json({
          error: `Invalid component type: ${component.type}`,
        });
      }

      if (!component.props || typeof component.props !== 'object') {
        return res.status(400).json({
          error: 'Each component must have a props object',
        });
      }
    }

    pages[slug] = components;
    await savePages();

    res.status(201).json({
      success: true,
      message: `Page '${slug}' created successfully`,
      slug,
      componentsCount: components.length,
    });
  } catch (err) {
    console.error('POST /api/pages error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/pages - List all pages
app.get('/api/pages', (req, res) => {
  const pageList = Object.keys(pages).map((slug) => ({
    slug,
    componentsCount: pages[slug].length,
  }));

  res.json({
    pages: pageList,
    total: pageList.length,
  });
});

// GET /api/pages/:slug - Get specific page
app.get('/api/pages/:slug', (req, res) => {
  const { slug } = req.params;

  if (!pages[slug]) {
    return res.status(404).json({ error: `Page '${slug}' not found` });
  }

  res.json({
    slug,
    components: pages[slug],
  });
});

// DELETE /api/pages/:slug - Delete page
app.delete('/api/pages/:slug', async (req, res) => {
  const { slug } = req.params;

  if (!pages[slug]) {
    return res.status(404).json({ error: `Page '${slug}' not found` });
  }

  delete pages[slug];
  await savePages();

  res.json({
    success: true,
    message: `Page '${slug}' deleted successfully`,
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    pagesCount: Object.keys(pages).length,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const startServer = async () => {
  await loadPages();
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
    console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer();

module.exports = app;
