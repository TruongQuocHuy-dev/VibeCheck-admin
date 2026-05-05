import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { ToolbarButton } from './ToolbarButton';
import { 
  Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Heading3, 
  Link as LinkIcon, Image as ImageIcon, Undo, Redo, Code, Minus
} from 'lucide-react';
import { wordCount, charCount } from '../utils';

interface WysiwygEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: 'Bắt đầu soạn thảo nội dung...' }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Nhập URL hình ảnh:');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('Nhập liên kết:', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-background-muted rounded-2xl overflow-hidden bg-background-card">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-background-muted/50 border-b border-background-muted">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="In đậm">
          <Bold size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="In nghiêng">
          <Italic size={18} />
        </ToolbarButton>
        <div className="w-[1px] h-6 bg-background-muted mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Tiêu đề 1">
          <Heading1 size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Tiêu đề 2">
          <Heading2 size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Tiêu đề 3">
          <Heading3 size={18} />
        </ToolbarButton>
        <div className="w-[1px] h-6 bg-background-muted mx-1" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Danh sách không thứ tự">
          <List size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Danh sách có thứ tự">
          <ListOrdered size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Trích dẫn">
          <Quote size={18} />
        </ToolbarButton>
        <div className="w-[1px] h-6 bg-background-muted mx-1" />
        <ToolbarButton onClick={setLink} isActive={editor.isActive('link')} title="Chèn liên kết">
          <LinkIcon size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Chèn hình ảnh">
          <ImageIcon size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title="Đoạn mã">
          <Code size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Dòng kẻ ngang">
          <Minus size={18} />
        </ToolbarButton>
        <div className="flex-1" />
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Hoàn tác">
          <Undo size={18} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Làm lại">
          <Redo size={18} />
        </ToolbarButton>
      </div>

      <div className="prose prose-invert max-w-none p-6 min-h-[400px] focus:outline-none custom-editor">
        <EditorContent editor={editor} />
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-t border-background-muted bg-background-muted/30 text-[10px] text-text-muted font-medium uppercase tracking-wider">
        <div className="flex gap-4">
          <span>Từ: {wordCount(editor.getHTML())}</span>
          <span>Ký tự: {charCount(editor.getHTML())}</span>
        </div>
        <div>Tự động lưu bản nháp: 30s</div>
      </div>

      <style>{`
        .custom-editor .ProseMirror:focus {
          outline: none;
        }
        .custom-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #676767;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
};
