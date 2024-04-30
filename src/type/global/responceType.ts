export interface responseJsonType {
    status: number,
    success: boolean,
    state: string,
    message: string,
    data?: {
        accessToken?: string,
        refreshToken?: string,
    }
}
