export class CommonFields {
    firstName: string
    lastName: string
    dateOfBirth: Date
    company: string
    address: string
}

export class Credential{
    email: string
    password: string
}

export interface CustomHttpResponse<T> {
    message: string;
    code: number;
    data: T;
    error: boolean;
    validationErros: Array<ValidatioErrorResponse>;
}

export interface ValidatioErrorResponse {
    fieldName: string;
    message: string;
}

export interface AuthToken {
    token: string
}