"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X } from "lucide-react";

interface Props {
    previewUrl?: string  ;     // 👈 لينك جاهز للعرض
    onSelect: (file: File) => void; // صورة جديدة
    onRemove: () => void;           // حذف
}

export default function UploaderImage({
    previewUrl,
    onSelect,
    onRemove,
}: Props) {
    const onDrop = useCallback(
        (files: File[]) => {
            const file = files[0];
            if (file) onSelect(file);
        },
        [onSelect]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFiles: 1,
    });

    return (
        <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer h-56 flex justify-center items-center"
        >
            <input {...getInputProps()} />

            {previewUrl ? (
                <div className="relative w-full h-full">
                    <Image
                        src={previewUrl}
                        alt="course image"
                        fill
                        className="object-contain rounded"
                    />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <p className="text-muted-foreground">اضغط لاختيار صورة</p>
            )}
        </div>
    );
}
