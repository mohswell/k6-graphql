import { PerformanceThresholds } from '@/src/models';

export const defaultThresholds: PerformanceThresholds = {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
    graphql_duration: ['p(95)<500', 'p(99)<1000'],
    graphql_errors: ['rate<0.01'],
    graphql_success_rate: ['rate>0.99'],
};