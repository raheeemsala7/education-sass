"use client"

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Menubar from './Menubar'
import { TextAlign } from '@tiptap/extension-text-align'


import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface EditorProps<T extends FieldValues, K extends Path<T>> {
    field: ControllerRenderProps<T, K>;
}

const Editor = <T extends FieldValues, K extends Path<T>>({ field }: EditorProps<T, K>) => {
    const parseContent = (value: string) => {
        if (!value) {
            return '<p>Hello World 🔥</p>'; // Default content
        }
        try {
            // Try to parse it as JSON (for new content)
            return JSON.parse(value);
        } catch {
            // If it fails, treat it as plain text (for old content)
            return {
                type: 'doc',
                content: [
                    {
                        type: 'paragraph',
                        content: [
                            {
                                type: 'text',
                                text: value,
                            },
                        ],
                    },
                ],
            };
        }
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg dark:prose-invert min-h-[300px] focus:outline-none p-4',
            },
        },

        onUpdate: ({ editor }) => {
            field.onChange(JSON.stringify(editor.getJSON()))
        },
        content: parseContent(field.value || ""),
        // content: field.value ? JSON.parse(field.value) : '<p>Hello World 🔥</p>',
    })
    return (
        <>
            <div className='w-full border border-input rounded-lg overflow-hidden dark:bg-input/30 '>
                <Menubar editor={editor} />
                <EditorContent editor={editor} />
            </div>
        </>
    )
}

export default Editor