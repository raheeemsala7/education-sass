// import { create } from "zustand";

// type UploadStatus = "idle" | "uploading" | "processing" | "ready" | "error";

// interface LessonUploadState {
//     uploads: Record<
//         string,
//         {
//             status: UploadStatus;
//             progress: number;
//         }
//     >;

//     startUpload: (lessonId: string) => void;
//     setProgress: (lessonId: string, progress: number) => void;
//     setProcessing: (lessonId: string) => void;
//     setReady: (lessonId: string) => void;
//     setError: (lessonId: string) => void;
//     clear: (lessonId: string) => void;
// }

// export const useLessonUploadStore = create<LessonUploadState>((set) => ({
//     uploads: {},

//     startUpload: (lessonId) =>
//         set((state) => ({
//             uploads: {
//                 ...state.uploads,
//                 [lessonId]: { status: "uploading", progress: 0 },
//             },
//         })),

//     setProgress: (lessonId, progress) =>
//         set((state) => ({
//             uploads: {
//                 ...state.uploads,
//                 [lessonId]: {
//                     ...state.uploads[lessonId],
//                     progress,
//                 },
//             },
//         })),

//     setProcessing: (lessonId) =>
//         set((state) => ({
//             uploads: {
//                 ...state.uploads,
//                 [lessonId]: { status: "processing", progress: 100 },
//             },
//         })),

//     setReady: (lessonId) =>
//         set((state) => ({
//             uploads: {
//                 ...state.uploads,
//                 [lessonId]: { status: "ready", progress: 100 },
//             },
//         })),

//     setError: (lessonId) =>
//         set((state) => ({
//             uploads: {
//                 ...state.uploads,
//                 [lessonId]: { status: "error", progress: 0 },
//             },
//         })),

//     clear: (lessonId) =>
//         set((state) => {
//             const copy = { ...state.uploads };
//             delete copy[lessonId];
//             return { uploads: copy };
//         }),
// }));



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
