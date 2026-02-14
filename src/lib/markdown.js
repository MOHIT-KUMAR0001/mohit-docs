import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

// Configure marked with highlight.js
marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  })
);

// Custom renderer for enhanced features
const renderer = new marked.Renderer();

// Add anchor links to headings
const originalHeadingRenderer = renderer.heading.bind(renderer);
renderer.heading = function (text, level, raw) {
  const slug = raw
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return `
    <h${level} id="${slug}" class="group">
      <a href="#${slug}" class="heading-anchor" aria-hidden="true">#</a>
      ${text}
    </h${level}>
  `;
};

// Enhanced code block with language label and copy button
renderer.code = function (code, language) {
  const lang = language || 'text';
  const validLang = hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(code, { language: validLang }).value;
  
  return `
    <div class="code-block-wrapper group relative my-6">
      ${lang !== 'text' ? `<div class="code-language">${lang}</div>` : ''}
      <button 
        class="copy-button" 
        onclick="navigator.clipboard.writeText(this.closest('.code-block-wrapper').querySelector('code').textContent)"
        title="Copy code"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      </button>
      <pre><code class="hljs language-${validLang}">${highlighted}</code></pre>
    </div>
  `;
};

marked.setOptions({
  renderer,
  gfm: true,
  breaks: false,
  pedantic: false,
});

/**
 * Parse markdown to HTML
 */
export function parseMarkdown(markdown) {
  return marked.parse(markdown);
}

/**
 * Strip frontmatter from markdown
 */
export function stripFrontmatter(markdown) {
  const frontmatterRegex = /^---\s*\n[\s\S]*?\n---\s*\n/;
  return markdown.replace(frontmatterRegex, '');
}

/**
 * Extract headings for table of contents
 */
export function extractHeadings(markdown) {
  const headings = [];
  const lines = markdown.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      const slug = text
        .toLowerCase()
        .replace(/[^\w]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      headings.push({ level, text, slug });
    }
  }
  
  return headings;
}

export default { parseMarkdown, stripFrontmatter, extractHeadings };
