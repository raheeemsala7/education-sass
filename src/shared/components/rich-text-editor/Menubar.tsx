import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { Toggle } from '../ui/toggle'
import { AlignCenter, AlignLeft, AlignRight, Bold, Heading1, Heading2, Heading3, Italic, ListIcon, ListOrdered, Redo, Strikethrough, Undo } from 'lucide-react'
import { type Editor } from '@tiptap/react'
import { cn } from '@/shared/lib/utils'

interface IProps {
    editor: Editor | null;
}

const Menubar = ({ editor }: IProps) => {
    if (!editor) return null
    return (
        <>
            <div className='border border-input border-t-0 rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center'>

                <div className='flex gap-1 flex-wrap'>
                    <Tooltip>
                        <TooltipTrigger >
                            <Toggle size={"sm"}
                                pressed={editor.isActive('bold')}
                                onPressedChange={() => {
                                    editor.chain().toggleBold().run()
                                }}
                                className={cn(
                                    editor.isActive("bold") && "bg-primary text-white"
                                )}
                            >
                                <Bold />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Bold</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger >
                            <Toggle size={"sm"}
                                pressed={editor.isActive('italic')}
                                onPressedChange={() => {
                                    editor.chain().toggleItalic().run()
                                }}
                                className={cn(
                                    editor.isActive("italic") && "bg-primary text-white"
                                )}
                            >
                                <Italic />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Italic</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger >
                            <Toggle size={"sm"}
                                pressed={editor.isActive('strike')}
                                onPressedChange={() => {
                                    editor.chain().focus().toggleStrike().run()
                                }}
                                className={cn(
                                    editor.isActive("strike") && "bg-primary text-white"
                                )}
                            >
                                <Strikethrough />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Strikethrough</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger >
                            <Toggle size={"sm"}
                                pressed={editor.isActive('heading', { level: 1 })}
                                onPressedChange={() => {
                                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                                }}
                                className={cn(
                                    editor.isActive("heading", { level: 1 }) && "bg-primary text-white"
                                )}
                            >
                                <Heading1 />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Heading 1</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Toggle size={"sm"}
                                pressed={editor.isActive('heading', { level: 2 })}
                                onPressedChange={() => {
                                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                                }}
                                className={cn(
                                    editor.isActive("heading", { level: 2 }) && "bg-primary text-white"
                                )}
                            >
                                <Heading2 />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Heading 2</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Toggle size={"sm"}
                                pressed={editor.isActive('heading', { level: 3 })}
                                onPressedChange={() => {
                                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                                }}
                                className={cn(
                                    editor.isActive("heading", { level: 3 }) && "bg-primary text-white"
                                )}
                            >
                                <Heading3 />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Heading 3</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <Toggle size={"sm"}
                                pressed={editor.isActive('bulletList')}
                                onPressedChange={() => {
                                    editor.chain().focus().toggleBulletList().run()
                                }}
                                className={cn(
                                    editor.isActive("bulletList") && "bg-primary text-white"
                                )}
                            >
                                <ListIcon />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Heading 3</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger >
                            <Toggle size={"sm"}
                                pressed={editor.isActive('orderedList')}
                                onPressedChange={() => {
                                    editor.chain().focus().toggleOrderedList().run()
                                }}
                                className={cn(
                                    editor.isActive("orderedList") && "bg-primary text-white"
                                )}
                            >
                                <ListOrdered />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Ordered List</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                <div className="w-px h-6 max-w-2 bg-border"></div>

                <div className='flex flex-wrap gap-1'>
                    <Tooltip>
                        <TooltipTrigger >
                            <Toggle size={"sm"}
                                pressed={editor.isActive({ textAlign: "left" })}
                                onPressedChange={() => {
                                    editor.chain().focus().setTextAlign("left").run()
                                }}
                                className={cn(
                                    editor.isActive({ textAlign: "left" }) && "bg-primary text-white"
                                )}
                            >
                                <AlignLeft />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Text Align Left</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger >
                            <Toggle size={"sm"}
                                pressed={editor.isActive({ textAlign: "center" })}
                                onPressedChange={() => {
                                    editor.chain().focus().setTextAlign("center").run()
                                }}
                                className={cn(
                                    editor.isActive({ textAlign: "center" }) && "bg-primary text-white"
                                )}
                            >
                                <AlignCenter />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Text Align Center</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger >
                            <Toggle size={"sm"}
                                pressed={editor.isActive({ textAlign: "right" })}
                                onPressedChange={() => {
                                    editor.chain().focus().setTextAlign("right").run()
                                }}
                                className={cn(
                                    editor.isActive({ textAlign: "right" }) && "bg-primary text-white"
                                )}
                            >
                                <AlignRight />
                            </Toggle>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Text Align Right</p>
                        </TooltipContent>
                    </Tooltip>


                </div>

                <div className="w-px h-6 max-w-2 bg-border"></div>

                <div className="flex gap-1">
                    <Tooltip>
                        <TooltipTrigger >
                            <Button size={"sm"} variant={"ghost"} type='button' onClick={() => {
                                editor.chain().focus().undo().run()
                            }}
                            disabled={!editor.can().undo()}
                            >
                                <Undo />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Undo</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger >
                            <Button size={"sm"} variant={"ghost"} type='button' onClick={() => {
                                editor.chain().focus().redo().run()
                            }}
                            disabled={!editor.can().redo()}
                            >
                                <Redo />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Redo</p>
                        </TooltipContent>
                    </Tooltip>

                </div>

            </div>

        </>
    )
}

export default Menubar