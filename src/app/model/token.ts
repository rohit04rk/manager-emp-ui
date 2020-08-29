export interface JwtToken {
    uuid: string
    name: string
    sub: string
    role: string
    iat: Date
    exp: Date
}