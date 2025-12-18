import { Response as K6Response } from 'k6/http';

export interface GraphQLRequest<V = Record<string, any>> {
    query: string;
    variables?: V;
    operationName?: string;
}

export interface GraphQLErrorType {
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: (string | number)[];
    extensions?: Record<string, any>;
}

export interface GraphQLResponse<T = Partial<K6Response>> {
    data?: T;
    errors?: GraphQLErrorType[];
    status?: number;
    ok?: boolean;
    extensions?: Record<string, any>;
}

export const CONTENT_TYPE: Record<string, string> = {
    JSON: 'application/json',
    GRAPHQL: 'application/graphql',
    FORM_URLENCODED: 'application/x-www-form-urlencoded',
    MULTIPART_FORM_DATA: 'multipart/form-data',
}

export type Headers = Record<string, string>;

export interface RequestOptions {
    headers?: Headers;
    timeout?: number;
    tags?: Record<string, string>;
}

export interface ClientConfig {
    baseUrl?: string;
    token?: string;
    authScheme?: 'Bearer' | 'Token' | 'ApiKey';
    timeout?: number;
    enableLogging?: boolean;
    customHeaders?: Headers;
}

/**
 * Test Data Generator Configuration
 */
export interface DataGeneratorConfig {
    seed?: number;
    locale?: string;
}

/**
 * Performance Thresholds
 */
export type PerformanceThresholds = Record<string, string[]>;


export type TimedResponse = {
    timings: {
        duration: number;
        waiting: number;
    };
};

export type GraphQLTimedResponse<T = any> = GraphQLResponse<T> & TimedResponse;