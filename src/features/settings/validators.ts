export const validateSemver = (version: string): boolean => {
  const semverRegex = /^[0-9]+\.[0-9]+\.[0-9]+$/;
  return semverRegex.test(version);
};

export const validateBroadcastTitle = (title: string): string | null => {
  if (!title) return 'Tiêu đề không được để trống';
  if (title.length > 100) return 'Tiêu đề không được vượt quá 100 ký tự';
  return null;
};

export const validateBroadcastBody = (body: string): string | null => {
  if (!body) return 'Nội dung không được để trống';
  if (body.length > 500) return 'Nội dung không được vượt quá 500 ký tự';
  return null;
};
