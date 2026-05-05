export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Normalize diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .trim();
};

export const wordCount = (html: string): number => {
  const text = html.replace(/<[^>]*>/g, ' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
};

export const charCount = (html: string): number => {
  const text = html.replace(/<[^>]*>/g, '');
  return text.length;
};

export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};
