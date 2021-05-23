export interface ApiResponseModel<T> {
    error?: { message: string; }
    data?: T;
}
