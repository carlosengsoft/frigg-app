
export enum TOKEN {
    ACCESS_TOKEN = "token",
    REFRESH_TOKEN = "refresh_token",
    EXPIRES_IN = "expires_in",
    SECRET_CREDENTIALS = "secret_credentials",
}

export class TokenModel {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    client_id: string;
}


