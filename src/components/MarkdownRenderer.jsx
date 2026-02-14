import { parseMarkdown, stripFrontmatter } from '../lib/markdown';

export default function MarkdownRenderer({ content }) {
  const stripped = stripFrontmatter(content);
  const html = parseMarkdown(stripped);

  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
