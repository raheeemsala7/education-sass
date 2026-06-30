

declare type SuccessResponse<T> = {
    status: true
    message?: string
    data: T;
    meta?: IPagination;

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
    per_page: number;
    total: number;
    last_page: number;
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
    message: string
}