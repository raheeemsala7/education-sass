import React from 'react'
import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from "lucide-react";
import { Button } from '../ui/button';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

export const RenderState = ({ isDragActive }: { isDragActive: boolean }) => {

    return (
        <div className="text-center">
            <div className='flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4'>
                <CloudUploadIcon
                    className={cn(
                        "size-6 text-muted-foreground",
                        isDragActive && "text-primary"
                    )}
                />
            </div>
            <p className="text-base font-semibold text-foreground cursor-pointer">
                اسحب الملف هنا<span className="text-primary block">  أو اضغط الملف هنا</span>
            </p>
            <Button type="button" className="mt-4">
                أختار الملف
            </Button>
        </div>
    )
}



export function RenderErrorState() {
    return (
        <div className="text-destructive text-center">
            <div className='flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4'>
                <ImageIcon
                    className={cn(
                        "size-6 text-destructive",
                    )}
                />
            </div>
            <p className="text-base font-semibold">
                upload Failed
            </p>
            <p className="text-xs mt-1 text-muted-foreground">
                SomeThing Went Wrong
            </p>
            <p className='text-xl mt-3 text-muted-foreground'>Click or drag file to retry</p>
            <Button type="button" className="mt-4">
                Retry File Selection
            </Button>
        </div>
    );
}

export function RenderUploadedState(
    { previewUrl, isDeleting, handelRemoverFile, fileType }:
        { previewUrl: string, isDeleting: boolean, handelRemoverFile: () => void; fileType: "image" | "video"; }) {

    return (
        <div className=" relative group size-full flex items-center justify-center">
            {fileType === "video" ? (
                <video src={previewUrl} controls className='rounded-sm size-full'></video>
            ) : (
                <Image
                    src={previewUrl}
                    alt='uploaded file preview'
                    fill
                    className='object-contain p-2'
                />
            )
            }
            <Button variant={"destructive"} size={"icon"}
                type='button'
                className={cn("absolute top-4 right-4")}
                onClick={(e) => {
                    e.stopPropagation()
                    handelRemoverFile()
                }}
                disabled={isDeleting}>
                {isDeleting ? <Loader2 className='size-4 animate-spin' /> : <XIcon />}

            </Button>
        </div>

    )
}


export function RenderUploadingState({
    progress,
    file,
}: {
    progress: number;
    file: File;
}) {
    return (
        <div className="text-center flex justify-center items-center flex-col">
            <p className='text-sm font-medium text-foreground'>{progress}%</p>
            <p className="mt-2 text-sm font-medium text-foreground">Uploading...</p>
            <p className="mt-1 text-xs text-muted-foreground truncate max-w-xs">
                {file.name}
            </p>
        </div>
    )
}