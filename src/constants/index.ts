export const VUs = 10;

export const DURATION = '30s';

export enum ApiMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export const httpStatusCodes = {
    ok: 200,
    created: 201,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    internalServerError: 500,
};


export const TIMEOUT = 5000 // in milliseconds

export const RETRY_ATTEMPTS = 3

export const LOG_LEVEL = {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug',
}
