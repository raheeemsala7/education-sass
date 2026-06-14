"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { Card, CardContent } from '../ui/card'
import { RenderErrorState, RenderState, RenderUploadedState, RenderUploadingState } from './renderState'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid';
import { useConstructUrl } from '@/shared/hooks/use-construct-url'
import { cn } from '@/shared/lib/utils'


interface UploaderState {
    id: string | null;
    file: File | null;
    uploading: boolean;
    progress: number;
    key?: string;
    isDeleting: boolean;
    error: boolean;
    objectUrl?: string;
    fileType: "image" | "video";
}

interface IProps {
    onChange: (value: string) => void;
    value?: string;
    fileTypeAccpeted: "image" | "video";
}

const Uploader = ({ onChange, value, fileTypeAccpeted }: IProps) => {

    const fileUrl = useConstructUrl(value || "")
    const [fileState, setFileState] = useState<UploaderState>({
        id: null,
        file: null,
        uploading: false,
        progress: 0,
        isDeleting: false,
        error: false,
        fileType: fileTypeAccpeted,
        key: value,
        objectUrl: value ? fileUrl : undefined,
    });


    const uploadFile = useCallback(
        async (file: File) => {
            setFileState((prev) => ({
                ...prev,
                uploading: true,
                progress: 0
            }))

            try {
                const presignedResponse = await fetch("/api/s3/upload", {
                    method: "POST",
                    body: JSON.stringify({
                        fileName: file.name,
                        contentType: file.type,
                        size: file.size,
                        isImage: fileTypeAccpeted === "image" ? true : false,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                if (!presignedResponse.ok) {
                    toast.error("Failed to get presigned URL")

                    setFileState((prev) => ({
                        ...prev,
                        uploading: false,
                        progress: 0,
                        error: true,
                    }))

                    return
                }

                const { key, presignedUrl } = await presignedResponse.json()

                await new Promise<void>((resolve, reject) => {
                    const xhr = new XMLHttpRequest()
                    xhr.upload.onprogress = (event) => {
                        if (event.lengthComputable) {
                            const percentageCompleted = (event.loaded / event.total) * 100
                            setFileState((prev) => ({
                                ...prev,
                                progress: Math.round(percentageCompleted),
                            }))
                        }
                    }
                    xhr.onload = () => {
                        if (xhr.status === 200 || xhr.status === 204) {
                            setFileState((prev) => ({
                                ...prev,
                                uploading: false,
                                progress: 100,
                                error: false,
                                key,
                            }))

                            onChange?.(key)
                            toast.success("File uploaded successfully")
                            resolve()
                        } else {
                            reject(new Error("Failed to upload file"))
                        }
                    }
                    xhr.onerror = () => {
                        reject(new Error("Upload Failed"))
                    }
                    xhr.open("PUT", presignedUrl)
                    xhr.setRequestHeader('Content-Type', file.type)
                    xhr.send(file)
                })
            } catch  {
                toast.error("something error")
                setFileState((prev) => ({
                    ...prev,
                    uploading: false,
                    progress: 0,
                    error: true,
                }))
            }
        },
        [fileTypeAccpeted ,onChange]
    )

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]
            if (fileState.objectUrl && fileState.objectUrl.startsWith("http")) {
                URL.revokeObjectURL(fileState.objectUrl)
            }
            const objectUrl = URL.createObjectURL(file)
            setFileState({
                error: false,
                file,
                uploading: false,
                objectUrl: objectUrl,
                id: uuidv4(),
                fileType: fileTypeAccpeted,
                isDeleting: false,
                progress: 0,
            })
            uploadFile(file)
        }
    }, [fileState.objectUrl, fileTypeAccpeted, uploadFile])


    function renderContent() {

        if (fileState.uploading) {
            return <RenderUploadingState progress={fileState.progress} file={fileState.file as File} />
        }

        if (fileState.error) {
            return <RenderErrorState />
        }

        if (fileState.objectUrl) {
            return <RenderUploadedState previewUrl={fileState.objectUrl} handelRemoverFile={handelRemoverFile} isDeleting={fileState.isDeleting} fileType={fileState.fileType}/>
        }

        return <RenderState isDragActive={true} />
    }

    useEffect(() => {

        return () => {
            if (fileState.objectUrl && fileState.objectUrl.startsWith("http")) {
                URL.revokeObjectURL(fileState.objectUrl)
            }
        }
    }, [fileState.objectUrl])




    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: fileTypeAccpeted === "video" ? { 'video/*': [] } : { 'image/*': [], },
        maxFiles: 1,
        maxSize:fileTypeAccpeted === "image" ? 1 * 1024 * 1024 : 5000 * 1024 * 1024,
        onDropRejected: rejectedFiles,
        disabled: fileState.uploading || !!fileState.objectUrl,
    })

    function rejectedFiles(fileRejected: FileRejection[]) {
        if (fileRejected.length) {

            if (fileRejected.length > 1) {
                toast.error('Too many files. Please upload only one file.')

            }

            const tooManyFiles = fileRejected.find((rejection) => rejection.errors[0].code === 'too-many-files')

            const fileSizingToBig = fileRejected.find((rejection) => rejection.errors[0].code === "file-too-large")


            if (tooManyFiles) {
                toast.error('Too many files. Please upload only one file.')
            }
            if (fileSizingToBig?.errors) {
                toast.error('File size is too big. Please upload a file smaller than 5MB.')
            }
        }


    }

    async function handelRemoverFile() {
        if (fileState.isDeleting || !fileState.key) {
            return
        }

        try {
            setFileState((prev) => ({
                ...prev,
                isDeleting: true,

            }))

            const res = await fetch("/api/s3/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    key: fileState.key,
                })
            })


            if (!res.ok) {
                toast.error("Failed to remove file from storage")
                setFileState((prev) => ({
                    ...prev,
                    isDeleting: true,
                    error: true
                }))
                return
            }

            if (fileState.objectUrl && fileState.objectUrl.startsWith("http")) {
                URL.revokeObjectURL(fileState.objectUrl)
            }
            onChange?.("")
            setFileState(() => ({
                id: null,
                file: null,
                uploading: false,
                progress: 0,
                isDeleting: false,
                error: false,
                fileType: fileTypeAccpeted,
            }))
            toast.success("File remove Succesfully")
        } catch  {
            toast.error("File removing file. please try again")
            setFileState((prev) => ({
                ...prev,
                isDeleting: false,
                error: true,
            }))
        }
    }

    return (
        <>
            <Card
                className={cn(
                    "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
                    isDragActive
                        ? "border-primary bg-primary/10 border-solid"
                        : "border-border hover:border-primary"
                )}
                {...getRootProps()}>
                <CardContent className='flex justify-center items-center h-full'>
                    <input {...getInputProps()} />
                    {renderContent()}

                </CardContent>
            </Card >
        </>
    )
}

export default Uploader