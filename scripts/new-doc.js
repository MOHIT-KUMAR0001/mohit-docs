import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../public/content');

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('❌ Error: Please provide a title for the new document');
  console.log('\nUsage:');
  console.log('  npm run new-doc -- "Document Title" --category "Category Name"');
  console.log('\nExample:');
  console.log('  npm run new-doc -- "React Hooks Guide" --category "React"');
  process.exit(1);
}

// Parse title and options
const title = args[0];
let category = 'General';

for (let i = 1; i < args.length; i++) {
  if (args[i] === '--category' && args[i + 1]) {
    category = args[i + 1];
    i++;
  }
}

// Generate slug from title
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const filename = `${slug}.md`;
const filePath = path.join(CONTENT_DIR, filename);

// Check if file already exists
if (fs.existsSync(filePath)) {
  console.error(`❌ Error: File already exists: ${filename}`);
  process.exit(1);
}

// Create frontmatter template
const today = new Date().toISOString().split('T')[0];
const template = `---
title: "${title}"
category: "${category}"
tags: []
date: ${today}
---

# ${title}

Write your content here...

## Section 1

Content for section 1.

## Section 2

Content for section 2.

## Conclusion

Summary and key takeaways.
`;

// Ensure content directory exists
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

// Write file
fs.writeFileSync(filePath, template);

console.log('✅ Created new document:');
console.log(`   File: ${filename}`);
console.log(`   Title: ${title}`);
console.log(`   Category: ${category}`);
console.log(`   Path: ${filePath}`);
console.log('\n💡 Next steps:');
console.log('   1. Edit the file to add your content');
console.log('   2. Add tags in the frontmatter');
console.log('   3. Run "npm run dev" to see your changes');
