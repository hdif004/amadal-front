import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lire VITE_WP_URL depuis .env.production
const envFile = path.join(__dirname, '../.env.production');
const envVars = fs.existsSync(envFile)
  ? Object.fromEntries(
      fs.readFileSync(envFile, 'utf-8')
        .split('\n')
        .filter(l => l.includes('='))
        .map(l => l.split('=').map(s => s.trim()))
    )
  : {};
const WP_URL   = envVars.VITE_WP_URL   || '';
const SITE_URL = envVars.VITE_SITE_URL || 'https://amadal.ma';
const WP_BASE  = `${WP_URL}/wp-json/wp/v2`;

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

async function fetchAllProducts() {
  const res = await fetch(`${WP_BASE}/produit?per_page=100&_fields=id,slug,title`);
  if (!res.ok) throw new Error(`Erreur fetch produits: ${res.status}`);
  return res.json();
}

async function fetchAllPosts() {
  const res = await fetch(`${WP_BASE}/posts?per_page=100&_fields=id,slug,title`);
  if (!res.ok) throw new Error(`Erreur fetch articles: ${res.status}`);
  return res.json();
}

async function generateSitemap() {
  try {
    const [products, posts] = await Promise.all([fetchAllProducts(), fetchAllPosts()]);

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    // Pages statiques
    const staticPages = [
      { url: '', priority: '1.0' },
      { url: 'about', priority: '0.8' },
      { url: 'products', priority: '0.8' },
      { url: 'contact', priority: '0.8' },
      { url: 'blog', priority: '0.8' },
    ];

    staticPages.forEach(page => {
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/${page.url}</loc>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Pages produits
    products.forEach(product => {
      const slug = product.slug || slugify(product.title?.rendered || String(product.id));
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/products/${slug}/${product.id}</loc>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    // Pages articles de blog
    posts.forEach(post => {
      const slug = post.slug || slugify(post.title?.rendered || String(post.id));
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/blog/${slug}/${post.id}</loc>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += '</urlset>';

    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);

    console.log(`Sitemap généré : ${staticPages.length} pages statiques, ${products.length} produits, ${posts.length} articles.`);
  } catch (error) {
    console.warn('⚠️  Sitemap non généré (API inaccessible) — le build continue.');
  }
}

generateSitemap();
