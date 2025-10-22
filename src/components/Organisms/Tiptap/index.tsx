'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { TextAlign } from '@tiptap/extension-text-align'
import HardBreak from '@tiptap/extension-hard-break'
import { Button } from '@/components/Atoms/ui/button'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  Code,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  CornerDownLeft,
  Indent,
  Outdent,
} from 'lucide-react'
import { cn } from '@/utils/CN'

interface TipTapEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export default function TipTapEditor({
  value,
  onChange,
  placeholder = 'Nhập nội dung...',
  className,
  disabled = false,
}: TipTapEditorProps) {
  // Theo dõi nội dung của editor
  const [content, setContent] = useState(value || '<p></p>')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      HardBreak.configure({
        keepMarks: false,
        HTMLAttributes: {
          class: 'my-2',
        },
      }),
    ],
    content: content,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }: { editor: Editor }) => {
      const html = editor.getHTML()
      setContent(html)
      onChange(html)
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none  px-3 py-2',
        placeholder: placeholder,
      },
    },
  })

  // Cập nhật nội dung khi prop value thay đổi từ bên ngoài
  useEffect(() => {
    if (value !== content) {
      setContent(value || '<p></p>')
      if (editor) {
        editor.commands.setContent(value || '<p></p>')
      }
    }
  }, [editor, value])

  if (!editor) {
    return null
  }

  const addImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          if (result) {
            editor.chain().focus().setImage({ src: result }).run()
          }
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  return (
    <div className={cn("border overflow-hidden", className || "rounded-md")}>
      {!disabled && (
        <div className="flex gap-1 p-1 border-b overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'bg-slate-200' : ''}
            aria-label="In đậm"
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'bg-slate-200' : ''}
            aria-label="In nghiêng"
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'bg-slate-200' : ''}
            aria-label="Tiêu đề 1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'bg-slate-200' : ''}
            aria-label="Tiêu đề 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.commands.setTextAlign('left')}
            className={editor.isActive({ textAlign: 'left' }) ? 'bg-slate-200' : ''}
            aria-label="Căn trái"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.commands.setTextAlign('center')}
            className={editor.isActive({ textAlign: 'center' }) ? 'bg-slate-200' : ''}
            aria-label="Căn giữa"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.commands.setTextAlign('right')}
            className={editor.isActive({ textAlign: 'right' }) ? 'bg-slate-200' : ''}
            aria-label="Căn phải"
          >
            <AlignRight className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.commands.setTextAlign('justify')}
            className={editor.isActive({ textAlign: 'justify' }) ? 'bg-slate-200' : ''}
            aria-label="Căn đều"
          >
            <AlignJustify className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.commands.setHardBreak()}
            aria-label="Ngắt dòng"
            title="Ngắt dòng (Shift + Enter)"
          >
            <CornerDownLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => {
              const { from, to } = editor.state.selection;
              const tr = editor.state.tr;
              tr.insertText('    ', from, to);
              editor.view.dispatch(tr);
            }}
            aria-label="Thụt lề"
            title="Thụt lề (4 spaces)"
          >
            <Indent className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => {
              const { from, to } = editor.state.selection;
              const tr = editor.state.tr;
              const text = editor.state.doc.textBetween(from, to);
              const newText = text.replace(/^    /, '');
              tr.insertText(newText, from, to);
              editor.view.dispatch(tr);
            }}
            aria-label="Bỏ thụt lề"
            title="Bỏ thụt lề"
          >
            <Outdent className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'bg-slate-200' : ''}
            aria-label="Danh sách"
          >
            <List className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'bg-slate-200' : ''}
            aria-label="Danh sách số"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'bg-slate-200' : ''}
            aria-label="Trích dẫn"
          >
            <Quote className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'bg-slate-200' : ''}
            aria-label="Mã"
          >
            <Code className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={addImage}
            aria-label="Chèn hình ảnh"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            aria-label="Hoàn tác"
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Undo className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            aria-label="Làm lại"
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      )}

      <EditorContent editor={editor} className="prose prose-sm max-w-none" />

      {/* CSS để hiện thị định dạng */}
      <style jsx global>{`
        .ProseMirror {
          font-family: var(--font-dfvn-graphit);
          color: black;
        }
        .ProseMirror h1 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror h2 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        .ProseMirror blockquote {
          border-left: 3px solid #6b7280;
          margin-left: 0.5rem;
          padding-left: 1rem;
          color: #6b7280;
          font-style: italic;
        }
        .ProseMirror pre {
          background-color: #f3f4f6;
          padding: 0.75rem;
          border-radius: 0.25rem;
          font-family: monospace;
          overflow-x: auto;
          color: black;
        }
        .ProseMirror p {
          margin: 0.5rem 0;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
        }
        .ProseMirror p[style*="text-align: left"],
        .ProseMirror h1[style*="text-align: left"],
        .ProseMirror h2[style*="text-align: left"] {
          text-align: left;
        }
        .ProseMirror p[style*="text-align: center"],
        .ProseMirror h1[style*="text-align: center"],
        .ProseMirror h2[style*="text-align: center"] {
          text-align: center;
        }
        .ProseMirror p[style*="text-align: right"],
        .ProseMirror h1[style*="text-align: right"],
        .ProseMirror h2[style*="text-align: right"] {
          text-align: right;
        }
        .ProseMirror p[style*="text-align: justify"],
        .ProseMirror h1[style*="text-align: justify"],
        .ProseMirror h2[style*="text-align: justify"] {
          text-align: justify;
        }
        .ProseMirror br {
          line-height: 1.5;
        }
        .ProseMirror p {
          white-space: pre-wrap;
          line-height: 1.6;
        }
        .ProseMirror [data-indent] {
          padding-left: 2rem;
        }
        .ProseMirror [data-indent="1"] {
          padding-left: 2rem;
        }
        .ProseMirror [data-indent="2"] {
          padding-left: 4rem;
        }
        .ProseMirror [data-indent="3"] {
          padding-left: 6rem;
        }
      `}</style>
    </div>
  )
}