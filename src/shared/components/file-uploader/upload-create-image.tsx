"use client";
import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

type MediaType = "image" | "video" | "both";

interface Props {
    previewUrl?: string;
    onSelect: (file: File) => void;
    onRemove: () => void;
    mediaType?: MediaType;
    height?: string;
}

export default function UploadCreateMedia({
    previewUrl,
    onSelect,
    onRemove,
    mediaType = "image",
    height = "h-56"
}: Props) {
    const [isDragging, setIsDragging] = useState(false);
    const [fileType, setFileType] = useState<"image" | "video" | null>();
    const inputRef = useRef<HTMLInputElement>(null);

    // تحديد نوع الملف من الـ preview URL
    useEffect(() => {
        if (previewUrl) {
            // تحقق من نوع الملف من الـ URL أو extension
            const isVideo = previewUrl.includes('.mp4') ||
                previewUrl.includes('.webm') ||
                previewUrl.includes('.mov') ||
                previewUrl.includes('video');
            setFileType(isVideo ? "video" : "image");
        } else {
            setFileType(null);
        }
    }, [previewUrl]);

    const getAcceptTypes = () => {
        switch (mediaType) {
            case "image":
                return "image/*";
            case "video":
                return "video/*";
            case "both":
                return "image/*,video/*";
            default:
                return "image/*";
        }
    };

    const handleFile = (file: File) => {
        if (!file) return;

        // تحديد نوع الملف
        const isVideo = file.type.startsWith("video");
        setFileType(isVideo ? "video" : "image");

        // استدعاء callback
        onSelect(file);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setFileType(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        onRemove();
    };

    const openFilePicker = () => {
        inputRef.current?.click();
    };

    const getPlaceholderText = () => {
        switch (mediaType) {
            case "image":
                return "اضغط لاختيار صورة";
            case "video":
                return "اضغط لاختيار فيديو";
            case "both":
                return "اضغط لاختيار صورة أو فيديو";
            default:
                return "اضغط لاختيار ملف";
        }
    };

    return (
        <div
            onClick={openFilePicker}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${height} flex justify-center items-center transition-colors ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
        >
            <input
                ref={inputRef}
                type="file"
                accept={getAcceptTypes()}
                onChange={onFileChange}
                className="hidden"
            />

            {previewUrl ? (
                <div className="relative flex justify-center items-center w-full h-full">
                    {mediaType === "image" ? (
                        <img
                            src={previewUrl}
                            alt="preview"
                            className="max-h-full max-w-full object-contain"
                        />
                    ) : (
                        <video
                            src={previewUrl}
                            controls
                            className="max-h-full max-w-full object-contain"
                        />
                    )}
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600 transition-colors z-10"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <p className="text-gray-500">{getPlaceholderText()}</p>
            )}
        </div>
    );
}