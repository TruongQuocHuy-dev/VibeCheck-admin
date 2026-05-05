export const PAGE_TEMPLATES = [
  { id: 'terms-of-service', label: 'Terms of Service', slug: 'terms-of-service' },
  { id: 'privacy-policy', label: 'Privacy Policy', slug: 'privacy-policy' },
  { id: 'about-us', label: 'About Us', slug: 'about-us' },
  { id: 'faq', label: 'FAQ', slug: 'faq' },
  { id: 'help-center', label: 'Help Center', slug: 'help-center' },
  { id: 'custom', label: 'Custom Page', slug: '' },
];

export const STATUS_COLORS = {
  draft: 'secondary',
  published: 'success',
  unpublished: 'warning',
} as const;
