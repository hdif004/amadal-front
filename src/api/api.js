const WP_ORIGIN = import.meta.env.VITE_WP_URL || "";
const WP_BASE = `${WP_ORIGIN}/wp-json/wp/v2`;

const decodeHtml = (str) => {
  if (!str) return str;
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

// Mappe un produit WP vers le format attendu par le front
const mapProduct = (wpProduct) => {
  const acf = wpProduct.acf || {};
  return {
    id: wpProduct.id,
    slug: wpProduct.slug,
    name: decodeHtml(wpProduct.title?.rendered || ""),
    imageURL: acf.image_principale?.sizes?.medium_large
      || acf.image_principale?.sizes?.large
      || acf.image_principale?.url
      || wpProduct._embedded?.["wp:featuredmedia"]?.[0]?.source_url
      || "",
    description: decodeHtml(acf.description_courte || wpProduct.excerpt?.rendered || ""),
    specs: acf.mesures || null,
    labelMesure: acf.label_mesure || null,
    note: acf.note || null,
    pdfUrl: acf.fiche_produit || null,
    featured: acf.featured === true || acf.featured === 1 || acf.featured === "1" || acf.featured === "true",
    categories: wpProduct.categorie || [],
    brandName: typeof acf.brand === "string" && isNaN(acf.brand) ? acf.brand : null,
    gallery: Array.isArray(acf.gallerie)
      ? acf.gallerie.map((img) => img?.sizes?.medium_large || img?.sizes?.large || img?.url || "").filter(Boolean)
      : [],
  };
};

export const fetchProducts = async (language = "fr") => {
  const res = await fetch(`${WP_BASE}/produit?per_page=100&_embed`);
  if (!res.ok) throw new Error("Erreur fetchProducts");
  const data = await res.json();
  return data.map(mapProduct);
};

export const fetchProductById = async (id, language = "fr") => {
  const res = await fetch(`${WP_BASE}/produit/${id}?_embed`);
  if (!res.ok) throw new Error("Erreur fetchProductById");
  const data = await res.json();
  return mapProduct(data);
};

export const fetchCategories = async () => {
  const res = await fetch(`${WP_BASE}/categorie?per_page=100&_fields=id,name,slug,parent`);
  if (!res.ok) throw new Error("Erreur fetchCategories");
  const data = await res.json();
  return data.map((cat) => ({
    idcategory: cat.id,
    name: decodeHtml(cat.name),
    parent: cat.parent || 0,
  }));
};

export const fetchBrands = async () => {
  return [];
};

export const searchProducts = async (query) => {
  const res = await fetch(
    `${WP_BASE}/produit?search=${encodeURIComponent(query)}&per_page=100&_embed&_fields=id,slug,title,excerpt,tags,_links,_embedded`
  );
  if (!res.ok) throw new Error("Erreur searchProducts");
  const data = await res.json();
  return data.map(mapProduct);
};

export const getFeaturedProducts = async () => {
  const all = await fetchProducts();
  return all.filter((p) => p.featured === true);
};

export const fetchRelatedProducts = async (productId, language = "fr") => {
  const all = await fetchProducts();
  return all.filter((p) => p.id !== Number(productId)).slice(0, 8);
};

export const fetchGroups = async () => {
  return [];
};

// Helpers blog
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").replace(/\[&hellip;\]/g, "...").trim();
};

const calculateReadTime = (content) => {
  if (!content) return "1 min read";
  const words = content.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

const formatDate = (isoDate) => {
  if (!isoDate) return "";
  return new Date(isoDate).toISOString().split("T")[0];
};

const mapBlogPost = (wp) => ({
  id: wp.id,
  title: decodeHtml(wp.title?.rendered || ""),
  description: stripHtml(decodeHtml(wp.excerpt?.rendered || "")),
  image_url: wp._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
  date_published: formatDate(wp.date),
  read_time: calculateReadTime(wp.content?.rendered),
  featured: wp.sticky || false,
});

const mapBlogPostFull = (wp) => ({
  ...mapBlogPost(wp),
  content: wp.content?.rendered || "",
  author_id: wp._embedded?.author?.[0]?.id || null,
  tags: (wp._embedded?.["wp:term"]?.[1] || []).map((t) => t.name).join(", "),
});

export const fetchBlogPosts = async () => {
  const res = await fetch(`${WP_BASE}/posts?_embed&per_page=100`);
  if (!res.ok) throw new Error("Erreur fetchBlogPosts");
  const data = await res.json();
  return data.map(mapBlogPost);
};

export const fetchBlogPostById = async (id) => {
  const res = await fetch(`${WP_BASE}/posts/${id}?_embed`);
  if (!res.ok) throw new Error("Erreur fetchBlogPostById");
  const data = await res.json();
  return mapBlogPostFull(data);
};

export const fetchBlogCategories = async () => {
  const res = await fetch(`${WP_BASE}/categories?per_page=100&_fields=id,name,slug`);
  if (!res.ok) throw new Error("Erreur fetchBlogCategories");
  const data = await res.json();
  return data.map((cat) => ({ id: cat.id, name: decodeHtml(cat.name) }));
};

export const fetchAuthors = async () => {
  const res = await fetch(`${WP_BASE}/users?per_page=100&_fields=id,name,avatar_urls`);
  if (!res.ok) throw new Error("Erreur fetchAuthors");
  const data = await res.json();
  return data.map((u) => ({
    id: u.id,
    name: u.name,
    profile_picture: u.avatar_urls?.["96"] || "",
  }));
};

export const fetchAuthorById = async (id) => {
  const res = await fetch(`${WP_BASE}/users/${id}?_fields=id,name,avatar_urls`);
  if (!res.ok) throw new Error("Erreur fetchAuthorById");
  const data = await res.json();
  return {
    id: data.id,
    name: data.name,
    profile_picture: data.avatar_urls?.["96"] || "",
  };
};

export const submitContactForm = async (formData) => {
  return { success: true };
};

export const subscribeToNewsletter = async (email) => {
  return { success: true, message: "Subscribed successfully!" };
};

// Posts réseaux sociaux — custom post type WordPress "publication"
const resolveImage = (field, embedded) => {
  // Champ ACF direct
  if (field) {
    if (typeof field === "string") return field;
    if (Array.isArray(field) && field[0]) {
      const f = field[0];
      return f.url || f.sizes?.large || f.sizes?.medium_large || "";
    }
    if (typeof field === "object") {
      return field.url || field.sizes?.large || field.sizes?.medium_large || field.sizes?.medium || "";
    }
  }
  // Fallback : featured media embarqué
  if (embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    return embedded["wp:featuredmedia"][0].source_url;
  }
  // Fallback : acf:attachment embarqué (premier élément)
  const att = embedded?.["acf:attachment"]?.[0];
  if (att) {
    return att.url || att.source_url || att.media_details?.sizes?.large?.source_url || "";
  }
  return "";
};

const resolveVideo = (field) => {
  if (!field) return null;
  if (typeof field === "string") return field || null;
  if (typeof field === "object") return field.url || null;
  return null;
};

const mapPublication = (wp) => {
  const acf = wp.acf || {};
  const embedded = wp._embedded || {};

  // Toutes les images depuis acf:attachment (filtrées par mime type)
  const attachments = embedded["acf:attachment"] || [];
  const images = attachments
    .filter((att) => att.mime_type?.startsWith("image/"))
    .map((att) => att.url || att.source_url || att.media_details?.sizes?.large?.source_url || "")
    .filter(Boolean);

  // Fallback sur acf.image si aucun attachement
  if (images.length === 0) {
    const single = resolveImage(acf.image, embedded);
    if (single) images.push(single);
  }

  return {
    id: wp.id,
    slug: wp.slug,
    title: decodeHtml(wp.title?.rendered || ""),
    description: acf.description || "",
    images,
    video: resolveVideo(acf.video),
    lien: acf.lien_du_post || null,
    date: wp.date || null,
  };
};

export const fetchPosts = async () => {
  const res = await fetch(`${WP_BASE}/publication?per_page=100&_embed&acf_format=standard`);
  if (!res.ok) throw new Error("Erreur fetchPosts");
  const data = await res.json();
  return data.map(mapPublication);
};
