export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove all non-word chars (except spaces and dashes)
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
};

export const generateProductUrl = (product) => {
  const nameToUse = product.name_en || product.name;
  const slug = slugify(nameToUse);
  return `/products/${slug}/${product.id}`;
}; 