export interface JwtToken {
    uuid: string
    sub: string
    role: string,
    iat: Date
    exp: Date
}