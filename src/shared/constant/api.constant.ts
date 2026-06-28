


export const HEADERS = {
    JsonBody: {
        "Content-Type": "application/json",
        // "Accept": "application/json",
    },
    authorize: (token: string) => ({
        "Authorization": `Bearer ${token}`,
    })
}

export const DEFAULT_LIMIT_COURSES_ADMIN = 9
export const DEFAULT_LIMIT_DIPLOMA_ADMIN = 12