import { useConstructUrl } from "../hooks/use-construct-url";

export const uploadFileToS3 = async (file: File | null, onProgress?: (percent: number) => void
): Promise<string> => {
    try {
        if (!file) {
            return ""
        }
        // 1. احصل على presigned URL
        const presignedResponse = await fetch("/api/s3/upload", {
            method: "POST",
            body: JSON.stringify({
                fileName: file.name,
                contentType: file.type,
                size: file.size,
                isImage: true,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!presignedResponse.ok) {
            throw new Error("Failed to get presigned URL");
        }

        const { key, presignedUrl } = await presignedResponse.json();

        // 2. ارفع الملف على S3 باستخدام XMLHttpRequest
        await new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentageCompleted = (event.loaded / event.total) * 100;                }
                if (event.lengthComputable && onProgress) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    onProgress(percent);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200 || xhr.status === 204) {
                    resolve();
                } else {
                    reject(new Error(`Upload failed with status: ${xhr.status}`));
                }
            };

            xhr.onerror = () => {
                reject(new Error("Upload failed"));
            };

            xhr.open("PUT", presignedUrl);
            xhr.setRequestHeader('Content-Type', file.type);
            // مهم: لا تضيف headers إضافية غير Content-Type
            xhr.send(file);
        });

        return useConstructUrl(key);
    } catch (error) {
        console.error("Upload error:", error);
        throw new Error("فشل رفع الصورة");
    }
};
