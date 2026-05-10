import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePages } from '../hooks/usePages';
import { usePageEditor } from '../hooks/usePageEditor';
import { usePageVersions } from '../hooks/usePageVersions';
import { PageList } from '../components/PageList';
import { WysiwygEditor } from '../components/WysiwygEditor';
import { SlugInput } from '../components/SlugInput';
import { LanguageSelector } from '../components/LanguageSelector';
import { PagePreview } from '../components/PagePreview';
import { VersionHistory } from '../components/VersionHistory';
import type { CMSPage, PageVersion } from '../types';
import { Button } from '../../../shared/ui/Button';
import { Skeleton } from '../../../shared/ui/Skeleton';
import { Plus, ChevronLeft, Save, Send, Eye, Layout, Info } from 'lucide-react';

export const CMSPages: React.FC = () => {
  const { pages, isLoading, deletePage } = usePages();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showPreview, setShowPreview] = useState(false);

  const view = (searchParams.get('v') as 'list' | 'edit' | 'history') || 'list';
  const slug = searchParams.get('slug');

  const editingPage = pages.find(p => p.slug === slug);

  // Editor hook
  const editor = usePageEditor(editingPage);

  // Versions hook
  const { data: versions = [], isLoading: isLoadingVersions } = usePageVersions(editingPage?.id);

  const handleEdit = (page: CMSPage) => {
    setSearchParams({ v: 'edit', slug: page.slug });
  };

  const handleCreate = () => {
    setSearchParams({ v: 'edit' });
  };

  const handleBack = () => {
    setSearchParams({});
  };

  const handlePublish = async () => {
    if (window.confirm('Bạn có chắc muốn xuất bản trang này?')) {
      await editor.handleSave('published');
      handleBack();
    }
  };

  const handleRestore = (version: PageVersion) => {
    if (window.confirm(`Khôi phục về phiên bản #${version.versionNumber}?`)) {
      editor.updateField('content', version.content);
      editor.updateField('changeSummary', `Khôi phục từ phiên bản #${version.versionNumber}`);
      setSearchParams({ v: 'edit', slug: slug || '' });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa trang này? Hành động này không thể hoàn tác.')) {
      try {
        await deletePage(id);
      } catch (e) {
        console.error('Delete failed:', e);
        alert('Xóa thất bại');
      }
    }
  };

  if (view === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">CMS Pages</h1>
            <p className="text-text-secondary text-sm mt-1">Quản lý nội dung các trang tĩnh và tài liệu hệ thống</p>
          </div>
          <Button variant="primary" className="gap-2" onClick={handleCreate}>
            <Plus size={18} />
            Tạo trang mới
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
          </div>
        ) : (
          <PageList 
            pages={pages} 
            onEdit={handleEdit}
            onPreview={(p) => { setSearchParams({ v: 'list', slug: p.slug }); setShowPreview(true); }}
            onViewHistory={(p) => { setSearchParams({ v: 'history', slug: p.slug }); }}
            onDelete={handleDelete}
          />
        )}

        {showPreview && editingPage && (
          <PagePreview 
            title={editingPage.title} 
            content={editingPage.content} 
            onClose={() => setShowPreview(false)} 
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-background-muted pb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="p-2 bg-background-muted rounded-xl text-text-secondary hover:text-white transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              {view === 'history' ? `Lịch sử: ${editingPage?.title}` : editingPage ? `Chỉnh sửa: ${editingPage.title}` : 'Tạo trang mới'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 rounded-md">
                <Layout size={10} className="text-primary" />
                <span className="text-[10px] font-bold text-primary uppercase">
                  {view === 'history' ? 'Version History' : 'Editor Mode'}
                </span>
              </div>
              {editor.lastSaved && (
                <span className="text-[10px] text-text-muted italic">Đã lưu lúc: {editor.lastSaved}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {view === 'edit' && (
            <>
              <Button variant="secondary" className="gap-2" onClick={() => setShowPreview(true)}>
                <Eye size={16} />
                Xem trước
              </Button>
              <Button 
                variant="secondary" 
                className="gap-2" 
                onClick={() => editor.handleSave()}
                isLoading={editor.isSaving}
                disabled={!editor.isDirty}
              >
                <Save size={16} />
                Lưu nháp
              </Button>
              <Button variant="primary" className="gap-2 px-6" onClick={handlePublish}>
                <Send size={16} />
                Xuất bản
              </Button>
            </>
          )}
          {view === 'history' && (
            <Button variant="secondary" onClick={() => setSearchParams({ v: 'edit', slug: slug || '' })}>
              Quay lại soạn thảo
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {view === 'edit' ? (
            <>
              <div className="space-y-4 bg-background-card border border-background-muted rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">
                      Tiêu đề trang
                    </label>
                    <input
                      type="text"
                      value={editor.page.title}
                      onChange={(e) => editor.updateField('title', e.target.value)}
                      placeholder="Nhập tiêu đề trang..."
                      className="w-full bg-background-muted border border-background-muted rounded-xl px-4 py-3 text-lg font-bold text-text-primary focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">
                      Ngôn ngữ
                    </label>
                    <LanguageSelector 
                      value={editor.page.language || 'vi'} 
                      onChange={(l) => editor.updateField('language', l)} 
                    />
                  </div>
                </div>
                
                <SlugInput 
                  value={editor.page.slug || ''} 
                  onChange={(s) => editor.updateField('slug', s)} 
                />
              </div>

              <WysiwygEditor 
                content={editor.page.content || ''} 
                onChange={(c) => editor.updateField('content', c)} 
              />
            </>
          ) : (
            isLoadingVersions ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
              </div>
            ) : (
              <VersionHistory 
                versions={versions}
                currentContent={editor.page.content || ''}
                onRestore={handleRestore}
              />
            )
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-background-card border border-background-muted rounded-2xl p-6 space-y-6 sticky top-6">
            <div className="flex items-center gap-2 text-primary">
              <Info size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider">SEO & Metadata</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">
                  Meta Description (Max 160)
                </label>
                <textarea
                  value={editor.page.metadata?.description}
                  onChange={(e) => editor.updateField('metadata', { ...editor.page.metadata, description: e.target.value })}
                  rows={4}
                  maxLength={160}
                  placeholder="Mô tả tóm tắt cho công cụ tìm kiếm..."
                  className="w-full bg-background-muted border border-background-muted rounded-xl px-4 py-3 text-xs text-text-primary focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
                <div className="flex justify-end">
                  <span className={`text-[10px] font-bold ${ (editor.page.metadata?.description?.length || 0) > 150 ? 'text-text-error' : 'text-text-muted'}`}>
                    {editor.page.metadata?.description?.length || 0}/160
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">
                  Tags (Ngăn cách bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  value={editor.page.metadata?.tags?.join(', ')}
                  onChange={(e) => editor.updateField('metadata', { ...editor.page.metadata, tags: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="legal, privacy, user..."
                  className="w-full bg-background-muted border border-background-muted rounded-xl px-4 py-3 text-xs text-text-primary focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div className="pt-4 border-t border-background-muted space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">
                  Ghi chú thay đổi (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={editor.page.changeSummary || ''}
                  onChange={(e) => editor.updateField('changeSummary', e.target.value)}
                  placeholder="Ví dụ: Cập nhật điều khoản bảo mật..."
                  className="w-full bg-background-muted border border-background-muted rounded-xl px-4 py-3 text-xs text-text-primary focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-background-muted">
              <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Mẹo SEO</h4>
              <ul className="space-y-2">
                {[
                  'Sử dụng từ khóa chính trong tiêu đề',
                  'Slug nên ngắn gọn và chứa từ khóa',
                  'Meta description nên lôi cuốn người đọc',
                  'Nội dung nên có ít nhất 300 từ'
                ].map((tip, i) => (
                  <li key={i} className="flex gap-2 text-[10px] text-text-secondary leading-relaxed">
                    <span className="text-primary">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <PagePreview 
          title={editor.page.title || 'Untitled'} 
          content={editor.page.content || ''} 
          onClose={() => setShowPreview(false)} 
        />
      )}
    </div>
  );
};
