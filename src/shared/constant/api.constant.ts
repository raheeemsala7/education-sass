


export const HEADERS = {
    JsonBody: {
        "Content-Type": "application/json",
    },
    authorize: (token: string) => ({
        "Authorization": `Bearer ${token}`,
    })
}

export const DEFAULT_LIMIT_DIPLOMA = 6
export const DEFAULT_LIMIT_DIPLOMA_ADMIN = 12