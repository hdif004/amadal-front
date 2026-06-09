export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // Convert accented chars to ASCII (é→e, à→a, etc.)
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const generateProductUrl = (product) => {
  const nameToUse = product.name_en || product.name;
  const slug = slugify(nameToUse);
  return `/products/${slug}/${product.id}`;
};
