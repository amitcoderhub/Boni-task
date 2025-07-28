# 🚀 Dynamic Page Creator

Create beautiful web pages instantly using reusable components through API or visual interface.

![Demo](https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=200&fit=crop)

## ✨ Features

- 🎨 **5 Components**: Card, ImageBlock, TextSection, StatsBox, CTA
- 🔧 **Instant Creation**: Pages available immediately at `/{slug}`
- 📱 **Mobile Responsive** with Tailwind CSS
- 🛠️ **Visual Builder** or API integration
- ⚡ **No Server Required** (localStorage fallback)

## 🚀 Quick Start

```bash
git clone https://github.com/your-username/dynamic-page-creator.git
cd dynamic-page-creator
npm install
npm run dev
```

Open `http://localhost:5173` and visit `/admin` to create pages.

## 🎯 Usage

### Visual Builder
1. Go to `/admin`
2. Enter page slug (e.g., "about")
3. Add components and configure
4. Page available at `/about`

### API
```bash
curl -X POST http://localhost:3001/api/pages \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "my-page",
    "components": [
      {
        "type": "TextSection",
        "props": {
          "title": "Hello World",
          "content": "This is my dynamic page!",
          "variant": "large"
        }
      }
    ]
  }'
```

## 🧩 Components

| Component | Props | Example |
|-----------|-------|---------|
| **TextSection** | `title`, `content`, `variant` | Headlines, paragraphs |
| **ImageBlock** | `src`, `alt`, `caption` | Hero images, photos |
| **Card** | `title`, `content`, `image`, `variant` | Feature cards, services |
| **StatsBox** | `stats: [{label, value}]` | Numbers, metrics |
| **CTA** | `title`, `description`, `buttonText`, `buttonLink` | Call-to-action sections |

## 🛠️ Optional Server

```bash
cd server
npm install
npm run dev  # Runs on port 3001
```

Without server: Uses localStorage (browser-only)  
With server: Persistent storage across sessions

## 📦 Build & Deploy

```bash
npm run build        # Frontend
cd server && npm start  # Backend (optional)
```

Deploy `dist/` folder to Vercel, Netlify, or any static host.

## 🎨 Example Page Structure

```json
{
  "slug": "landing",
  "components": [
    {
      "type": "TextSection",
      "props": {
        "title": "Welcome to Our App",
        "content": "The best solution for your needs",
        "variant": "centered"
      }
    },
    {
      "type": "StatsBox", 
      "props": {
        "stats": [
          {"label": "Users", "value": "10K+"},
          {"label": "Rating", "value": "4.9★"}
        ]
      }
    },
    {
      "type": "CTA",
      "props": {
        "title": "Get Started Today",
        "description": "Join thousands of happy users",
        "buttonText": "Sign Up Free",
        "buttonLink": "#signup",
        "variant": "primary"
      }
    }
  ]
}
```

## 🔧 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express.js (optional)
- **Storage**: localStorage / JSON file
- **Routing**: React Router

## 📱 Demo

- **Live App**: [your-app-url.vercel.app](https://your-app-url.vercel.app)
- **Admin Panel**: [your-app-url.vercel.app/admin](https://your-app-url.vercel.app/admin)
- **Sample Pages**: `/about-us`, `/services`

## 🤝 Contributing

1. Fork repo
2. Create feature branch: `git checkout -b feature/new-component`
3. Commit changes: `git commit -m 'Add new component'`
4. Push and create PR

## 📄 License

MIT License - free for personal and commercial use.

---

**⭐ Star this repo if it helped you!**