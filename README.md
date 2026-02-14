# Mohit's Documentation Site

A modern, fast, and fully-featured static documentation site built with React, Vite, and Tailwind CSS. Write your documentation in Markdown, and it automatically transforms into a beautiful, searchable website.

## Features

✨ **Modern Tech Stack**
- React 18 for a reactive UI
- Vite for lightning-fast builds
- Tailwind CSS for beautiful, responsive styling
- Markdown with syntax highlighting via highlight.js

🎨 **Beautiful UI/UX**
- Clean, professional design
- Dark mode support (Light/Dark/System)
- Responsive layout for all devices
- Smooth animations and transitions

🔍 **Powerful Search**
- Full-text search across all documents
- Keyboard shortcut support (⌘K / Ctrl+K)
- Search by title, description, tags, and category

📚 **Smart Organization**
- Automatic categorization from frontmatter
- Sidebar navigation grouped by category
- Breadcrumb navigation
- Table of contents with scroll-spy

🚀 **Developer Friendly**
- Hot reload during development
- Auto-generated manifest from markdown files
- CLI tool for creating new documents
- Zero configuration needed

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/MOHIT-KUMAR0001/mohit-docs.git
cd mohit-docs

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your documentation site.

### Build for Production

```bash
npm run build
```

The built site will be in the `dist/` directory, ready to deploy.

### Preview Production Build

```bash
npm run preview
```

## Adding Documentation

### Method 1: Using the CLI Helper (Recommended)

Create a new document with proper frontmatter template:

```bash
npm run new-doc -- "My Document Title" --category "Category Name"
```

This creates a new `.md` file in `public/content/` with the correct structure.

### Method 2: Manual Creation

Create a new `.md` file in `public/content/` with frontmatter:

```markdown
---
title: "Your Document Title"
category: "Category Name"
tags: ["tag1", "tag2", "tag3"]
date: 2024-01-20
description: "Optional short description"
---

# Your Document Title

Your content here...
```

### Frontmatter Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | No* | Document title (falls back to first H1 or filename) |
| `category` | string | No | Category for grouping (defaults to "General") |
| `tags` | array | No | Array of tags for search and organization |
| `date` | string | No | ISO date or YYYY-MM-DD (defaults to file creation date) |
| `description` | string | No | Short description (falls back to first paragraph) |

*While not strictly required, it's recommended to include a title for better organization.

## Tech Stack

### Core Dependencies
- **React 18** — UI framework
- **React Router DOM** — Client-side routing
- **Vite** — Build tool and dev server
- **Tailwind CSS** — Utility-first CSS framework
- **@tailwindcss/typography** — Beautiful prose styling

### Markdown Processing
- **marked** — Markdown parser
- **marked-highlight** — Syntax highlighting integration
- **highlight.js** — Code syntax highlighting
- **gray-matter** — Frontmatter parsing

## Project Structure

```
mohit-docs/
├── public/
│   └── content/              # Your markdown files go here
│       ├── manifest.json     # Auto-generated (do not commit)
│       ├── javascript-closures.md
│       └── react-hooks.md
├── src/
│   ├── components/
│   │   ├── Layout.jsx        # Main layout with header
│   │   ├── Sidebar.jsx       # Category navigation
│   │   ├── ThemeToggle.jsx   # Light/Dark/System theme
│   │   ├── SearchBar.jsx     # ⌘K search modal
│   │   ├── MarkdownRenderer.jsx
│   │   └── TableOfContents.jsx
│   ├── hooks/
│   │   └── useTheme.js       # Theme management hook
│   ├── lib/
│   │   └── markdown.js       # Markdown configuration
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   └── DocPage.jsx       # Individual document page
│   ├── App.jsx               # Router setup
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── scripts/
│   ├── generate-manifest.js  # Pre-build manifest generator
│   └── new-doc.js            # CLI helper for new docs
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml              # Netlify deployment config
└── README.md
```

## Deployment

### Netlify (Recommended)

This site is configured for automatic deployment on Netlify:

1. Push your repository to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically:
   - Run `npm run build`
   - Deploy the `dist/` directory
   - Set up redirects for client-side routing

The `netlify.toml` configuration is already included.

### Other Platforms

The built site in `dist/` is a static site that can be deployed anywhere:
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

**Important**: Make sure your hosting platform supports client-side routing (SPA) by redirecting all routes to `index.html`.

## Development

### Available Scripts

```bash
npm run dev       # Start development server with hot reload
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run new-doc   # Create a new document with template
```

### How It Works

1. **Pre-build**: `generate-manifest.js` scans all `.md` files in `public/content/`
2. **Extraction**: Extracts frontmatter, calculates reading time, generates slugs
3. **Manifest**: Creates `manifest.json` with all document metadata
4. **Runtime**: React app loads manifest and fetches documents on demand
5. **Rendering**: Marked.js converts markdown to HTML with syntax highlighting

### Customization

**Brand Colors**: Edit `tailwind.config.js` to change the color scheme
**Fonts**: Update the Google Fonts link in `index.html`
**Logo**: Modify the logo component in `src/components/Layout.jsx`
**Styling**: Customize prose styles in `src/index.css`

## Features in Detail

### Theme System
- Three modes: Light, Dark, and System (follows OS preference)
- Persisted in localStorage
- Smooth transitions
- Cycle through modes with the theme toggle button

### Search
- Fuzzy search across title, description, tags, and categories
- Keyboard shortcut: ⌘K (Mac) or Ctrl+K (Windows/Linux)
- Modal overlay with live results
- Navigate directly to documents from search

### Markdown Features
- GitHub Flavored Markdown (GFM)
- Syntax highlighting for 180+ languages
- Heading anchor links
- Copy-to-clipboard for code blocks
- Custom styling for tables, blockquotes, lists
- Typography plugin for beautiful prose

### Table of Contents
- Auto-generated from H2-H4 headings
- Scroll-spy highlighting
- Smooth scroll navigation
- Only visible on large screens (xl+)

## Contributing

Contributions are welcome! Feel free to:
- Add new features
- Fix bugs
- Improve documentation
- Suggest enhancements

## License

MIT License - feel free to use this project for your own documentation needs.

## Author

**Mohit Kumar**
- GitHub: [@MOHIT-KUMAR0001](https://github.com/MOHIT-KUMAR0001)

---

Built with ❤️ using React, Vite, and Tailwind CSS
