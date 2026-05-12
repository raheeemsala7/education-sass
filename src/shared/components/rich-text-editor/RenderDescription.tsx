

"use client";

import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import { type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import parse from "html-react-parser";

type RenderDescriptionProps = {
    description?: string | null;
};

export function RenderDescription({ description }: RenderDescriptionProps) {
    const output = useMemo(() => {
        // ✅ حماية أولية
        if (!description || typeof description !== "string") {
            return null;
        }

        try {
            const json = JSON.parse(description) as JSONContent;

            return generateHTML(json, [
                StarterKit,
                TextAlign.configure({
                    types: ["heading", "paragraph"],
                }),
            ]);
        } catch (error) {
            console.error("❌ Invalid description JSON:", description);
            return null;
        }
    }, [description]);

    // ✅ Fallback واضح
    if (!output) {
        return (
            <p className="text-muted-foreground text-sm">
                الوصف غير متاح حاليًا
            </p>
        );
    }

    return (
        <div className="prose dark:prose-invert prose-li:marker:text-primary">
            {parse(output)}
        </div>
    );
}
