import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../public/content');
const MANIFEST_PATH = path.join(CONTENT_DIR, 'manifest.json');

// Calculate reading time (words / 200)
function calculateReadingTime(content) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
}

// Extract first paragraph as description
function extractDescription(content) {
  // Remove frontmatter
  const lines = content.split('\n');
  let inFrontmatter = false;
  let contentLines = [];
  
  for (const line of lines) {
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter;
      continue;
    }
    if (!inFrontmatter && line.trim()) {
      contentLines.push(line);
    }
  }
  
  // Find first paragraph (not a heading)
  for (const line of contentLines) {
    if (!line.startsWith('#') && line.trim().length > 0) {
      return line.trim().substring(0, 200);
    }
  }
  
  return '';
}

// Extract first heading as title fallback
function extractFirstHeading(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : null;
}

// Recursively scan directory for .md files
function scanMarkdownFiles(dir, baseDir = dir) {
  const files = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...scanMarkdownFiles(fullPath, baseDir));
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Generate manifest
function generateManifest() {
  console.log('🔍 Scanning for markdown files...');
  
  const markdownFiles = scanMarkdownFiles(CONTENT_DIR);
  const manifest = [];
  
  for (const filePath of markdownFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter, content: markdownContent } = matter(content);
      
      // Generate slug from filename
      const filename = path.basename(filePath, '.md');
      const slug = filename;
      
      // Extract metadata
      const title = frontmatter.title || extractFirstHeading(content) || filename;
      const category = frontmatter.category || 'General';
      const tags = frontmatter.tags || [];
      const date = frontmatter.date || new Date().toISOString();
      const description = frontmatter.description || extractDescription(markdownContent);
      const readingTime = calculateReadingTime(markdownContent);
      
      // Get file stats
      const stats = fs.statSync(filePath);
      const lastModified = stats.mtime.toISOString();
      
      manifest.push({
        slug,
        title,
        category,
        tags,
        date,
        description,
        readingTime,
        lastModified,
        filePath: path.relative(CONTENT_DIR, filePath),
      });
      
      console.log(`  ✓ ${title} (${category})`);
    } catch (error) {
      console.error(`  ✗ Error processing ${filePath}:`, error.message);
    }
  }
  
  // Sort by date (newest first)
  manifest.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Write manifest
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\n✅ Generated manifest with ${manifest.length} documents`);
  console.log(`📄 Manifest written to: ${MANIFEST_PATH}\n`);
}

// Run
generateManifest();
