// Simple frontmatter parser for the browser
function parseFrontmatter(text: string) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: text };
  
  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, any> = {};
  
  frontmatter.split('\n').forEach(line => {
    const firstColon = line.indexOf(':');
    if (firstColon !== -1) {
      const key = line.slice(0, firstColon).trim();
      let value = line.slice(firstColon + 1).trim();
      
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Handle simple arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        data[key] = value.slice(1, -1).split(',').map(s => {
          let item = s.trim();
          if ((item.startsWith('"') && item.endsWith('"')) || (item.startsWith("'") && item.endsWith("'"))) {
            item = item.slice(1, -1);
          }
          return item;
        });
      } else {
        data[key] = value;
      }
    }
  });
  
  return { data, content };
}

// Portfolio
const portfolioFiles = import.meta.glob('/content/portfolio/*.md', { query: '?raw', import: 'default' });

export async function getPortfolioList() {
  const items = [];
  for (const path in portfolioFiles) {
    const rawContent = await portfolioFiles[path]() as string;
    const slug = path.split('/').pop()?.replace('.md', '');
    const { data } = parseFrontmatter(rawContent);
    items.push({ slug, ...data });
  }
  // Sort by some criteria if needed (e.g. date)
  items.sort((a, b) => {
    if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
  return items;
}

export async function getPortfolioItem(slug: string) {
  const path = `/content/portfolio/${slug}.md`;
  if (!portfolioFiles[path]) return null;
  const rawContent = await portfolioFiles[path]() as string;
  const { data, content } = parseFrontmatter(rawContent);
  return { slug, ...data, content };
}

// Blog
const blogFiles = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default' });

export async function getBlogList() {
  const items = [];
  for (const path in blogFiles) {
    const rawContent = await blogFiles[path]() as string;
    const slug = path.split('/').pop()?.replace('.md', '');
    const { data } = parseFrontmatter(rawContent);
    items.push({ slug, ...data });
  }
  items.sort((a, b) => {
    if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
  return items;
}

export async function getBlogItem(slug: string) {
  const path = `/content/blog/${slug}.md`;
  if (!blogFiles[path]) return null;
  const rawContent = await blogFiles[path]() as string;
  const { data, content } = parseFrontmatter(rawContent);
  return { slug, ...data, content };
}

// Home content is an object of collections or maybe a single md
// Wait, in Home.tsx we see `fetch("/api/content/home/index")`
// Let's check what that is!
const homeFiles = import.meta.glob('/content/home/*.md', { query: '?raw', import: 'default' });

export async function getHomeContent() {
    const path = '/content/home/index.md';
    if (!homeFiles[path]) return null;
    const rawContent = await homeFiles[path]() as string;
    const { data, content } = parseFrontmatter(rawContent);
    return { ...data, content };
}
