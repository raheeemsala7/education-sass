

declare type SuccessResponse<T> = {
    status: "success"
    message?: string
    data: T
}
declare type IErrorResponse = {
    status: "error"
    code: number;
    message?: string;
    errors?: Array<{
        path: string;
        message: string;
    }>
}

declare type IApiResponse<T> = SuccessResponse<T> | IErrorResponse

declare interface IPagination<T> {

    data: T[];
    metadata: {
        current_page: number;
        per_page: number;
        limit: number;
        total: number;
        last_page: number;

    };
}

export interface IPaginatedResponse<T> {
 
    data: T[];
    meta: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
    };
}

export interface ITimeStamp {
    createdAt: string;
    updatedAt: string;
}

export interface IResponseMessage {
    message:string
}