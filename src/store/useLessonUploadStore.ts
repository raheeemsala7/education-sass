



import { create } from 'zustand';

type UploadState = {
    uploads: Record<
        string,
        {
            progress: number;
            status: 'uploading' | 'processing' | 'ready' | 'error';
        }
    >;

    startUpload: (lessonId: string) => void;
    setProgress: (lessonId: string, progress: number) => void;
    setProcessing: (lessonId: string) => void;
    setReady: (lessonId: string) => void;
    setError: (lessonId: string) => void;
};

export const useLessonUploadStore = create<UploadState>((set) => ({
    uploads: {},

    startUpload: (lessonId) =>
        set((state) => ({
            uploads: {
                ...state.uploads,
                [lessonId]: { progress: 0, status: 'uploading' },
            },
        })),

    setProgress: (lessonId, progress) =>
        set((state) => ({
            uploads: {
                ...state.uploads,
                [lessonId]: {
                    ...state.uploads[lessonId],
                    progress,
                },
            },
        })),

    setProcessing: (lessonId) =>
        set((state) => ({
            uploads: {
                ...state.uploads,
                [lessonId]: {
                    ...state.uploads[lessonId],
                    status: 'processing',
                },
            },
        })),

    setReady: (lessonId) =>
        set((state) => {
            const copy = { ...state.uploads };
            delete copy[lessonId]; // 👈 مهم جدًا
            return { uploads: copy };
        }),

    setError: (lessonId) =>
        set((state) => ({
            uploads: {
                ...state.uploads,
                [lessonId]: {
                    ...state.uploads[lessonId],
                    status: 'error',
                },
            },
        })),
}));
