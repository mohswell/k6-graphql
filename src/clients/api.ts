import http from 'k6/http';
import { Rate, Trend } from 'k6/metrics';
import {
    GraphQLRequest,
    GraphQLResponse,
    ClientConfig,
    Headers,
    RequestOptions,
    CONTENT_TYPE,
} from '../models';
import { Logger } from '../logger';
import { BASE_URL } from '@/src/config/env/config';

const graphqlDuration = new Trend('graphql_duration', true);
const graphqlErrors = new Rate('graphql_errors');
const graphqlSuccessRate = new Rate('graphql_success_rate');

const endpoint = '/graphql';

export class GraphQLClient {
    private config: Required<ClientConfig>;
    private logger: Logger;

    constructor(config: ClientConfig) {
        this.config = {
            baseUrl: BASE_URL.replace(/\/$/, ''),
            token: config.token || '',
            authScheme: config.authScheme || 'Bearer',
            timeout: config.timeout || 30000,
            enableLogging: config.enableLogging || false,
            customHeaders: config.customHeaders || {},
        };

        this.logger = config.enableLogging ? new Logger('GraphQLClient') : new Logger();
    }

    private buildHeaders(extra?: Headers): Headers {
        const headers: Headers = {
            'Content-Type': CONTENT_TYPE.JSON,
            Accept: CONTENT_TYPE.JSON,
            ...this.config.customHeaders,
        };

        if (this.config.token) {
            headers.Authorization = `${this.config.authScheme} ${this.config.token}`;
        }

        return { ...headers, ...(extra || {}) };
    }

    private parseResponse<T>(res: any, operationName?: string): GraphQLResponse<T> {
        let body: GraphQLResponse<T>;

        try {
            body = res.json() as GraphQLResponse<T>;
        } catch {
            body = { errors: [{ message: 'Failed to parse JSON', extensions: { responseBody: res.body } }] };
            this.logger.error(`[${operationName}] Failed to parse JSON response`);
        }

        const hasErrors = !!body.errors && body.errors.length > 0;
        const isSuccess = res.status >= 200 && res.status < 300 && !hasErrors;

        graphqlDuration.add(res.timings.duration);
        graphqlErrors.add(hasErrors ? 1 : 0);
        graphqlSuccessRate.add(isSuccess ? 1 : 0);

        this.logger.request('POST', operationName || 'GraphQL request');
        this.logger.response(res.status, res.timings.duration, hasErrors ? body.errors : undefined);

        return {
            status: res.status,
            ok: isSuccess,
            data: body.data,
            errors: body.errors,
            extensions: body.extensions,
        };
    }

    // Execute single query/mutation
    query<T = any, V = Record<string, any>>(
        request: GraphQLRequest<V>,
        options?: RequestOptions
    ): GraphQLResponse<T> {
        const url = `${this.config.baseUrl}${endpoint}`;
        const payload = JSON.stringify(request);
        const params: any = { headers: this.buildHeaders(options?.headers), timeout: options?.timeout || this.config.timeout };

        if (options?.tags) params.tags = options.tags;

        if (this.config.enableLogging) {
            this.logger.info(`Executing query: ${request.operationName || 'GraphQL'} -> ${url}`);
        }

        const res = http.post(url, payload, params);
        return this.parseResponse<T>(res, request.operationName);
    }

    // Batch multiple queries/mutations
    batch<T = any>(
        requests: GraphQLRequest[],
        options?: RequestOptions
    ): GraphQLResponse<T>[] {
        const url = `${this.config.baseUrl}${endpoint}`;
        const headers = this.buildHeaders(options?.headers);
        const timeout = options?.timeout || this.config.timeout;

        const batchRequests = requests.map((req) => ({
            method: 'POST' as const,
            url,
            body: JSON.stringify(req),
            params: { headers, timeout, tags: options?.tags },
        }));

        const responses = http.batch(batchRequests);
        return responses.map((res, i) => this.parseResponse<T>(res as any, requests[i].operationName));
    }

    updateConfig(config: Partial<ClientConfig>) {
        this.config = { ...this.config, ...config };
        this.logger.info('Configuration updated');
    }

    getConfig(): Readonly<Required<ClientConfig>> {
        return { ...this.config };
    }
}

export const createGraphQLClient = (config: ClientConfig) => new GraphQLClient(config);
