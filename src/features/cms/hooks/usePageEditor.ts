import { useState, useEffect } from 'react';
import { usePages } from './usePages';
import type { CMSPage } from '../types';
import { slugify } from '../utils';

export const usePageEditor = (initialPage?: CMSPage) => {
  const { savePage, isSaving } = usePages();
  const [page, setPage] = useState<Partial<CMSPage>>(initialPage || {
    title: '',
    slug: '',
    content: '',
    language: 'vi',
    status: 'draft',
    metadata: { description: '', tags: [] }
  });

  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    if (initialPage) {
      setPage(initialPage);
      setIsDirty(false);
    } else {
      // Reset to default for create mode
      setPage({
        title: '',
        slug: '',
        content: '',
        language: 'vi',
        status: 'draft',
        metadata: { description: '', tags: [] }
      });
      setIsDirty(false);
    }
  }, [initialPage]);

  const updateField = (field: keyof CMSPage, value: any) => {
    setPage(prev => {
      const newPage = { ...prev, [field]: value };
      if (field === 'title' && !initialPage) {
        newPage.slug = slugify(value);
      }
      return newPage;
    });
    setIsDirty(true);
  };

  const handleSave = async (statusOverride?: CMSPage['status']) => {
    const pageToSave = statusOverride ? { ...page, status: statusOverride } : page;
    const saved = await savePage(pageToSave);
    setPage(saved);
    setIsDirty(false);
    setLastSaved(new Date().toLocaleTimeString());
    return saved;
  };

  // Auto-save logic (debounced)
  useEffect(() => {
    if (!isDirty) return;
    
    const timer = setTimeout(() => {
      // handleSave(); // TODO: Enable auto-save when ready
    }, 30000);

    return () => clearTimeout(timer);
  }, [isDirty, page]);

  return {
    page,
    updateField,
    handleSave,
    isSaving,
    isDirty,
    lastSaved
  };
};
