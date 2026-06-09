

declare type SuccessResponse<T> = {
    status: true
    message?: string
    data: T
}
declare type IErrorResponse = {
    status: false
    code: number;
    message?: string;
    errors?: Array<{
        path: string;
        message: string;
    }>
}

declare type IApiResponse<T> = SuccessResponse<T> | IErrorResponse

export interface IPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface IPaginatedResponse<T> {
    data: T;
    meta: IPagination;
}

export interface ITimeStamp {
    createdAt: string;
    updatedAt: string;
}

export interface IResponseMessage {
    message:string
}