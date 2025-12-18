import { Options } from 'k6/options';
import { defaultThresholds } from '../thresholds';


const createStages = (stages: { duration: string; target: number }[]): Options => ({
    stages,
    thresholds: defaultThresholds,
});

export const scenarios: Record<string, Options> = {
    smoke: createStages([
        { duration: '1m', target: 1 },
        { duration: '2m', target: 1 },
        { duration: '1m', target: 0 },
    ]),

    load: createStages([
        { duration: '2m', target: 10 },
        { duration: '5m', target: 10 },
        { duration: '2m', target: 20 },
        { duration: '5m', target: 20 },
        { duration: '2m', target: 0 },
    ]),

    stress: {
        stages: [
            { duration: '2m', target: 10 },
            { duration: '5m', target: 10 },
            { duration: '2m', target: 50 },
            { duration: '5m', target: 50 },
            { duration: '2m', target: 100 },
            { duration: '5m', target: 100 },
            { duration: '5m', target: 0 },
        ],
        thresholds: {
            ...defaultThresholds,
            http_req_duration: ['p(95)<1000'],
        },
    },

    spike: {
        stages: [
            { duration: '1m', target: 10 },
            { duration: '30s', target: 100 },
            { duration: '1m', target: 100 },
            { duration: '30s', target: 10 },
            { duration: '2m', target: 10 },
            { duration: '1m', target: 0 },
        ],
        thresholds: {
            ...defaultThresholds,
            http_req_duration: ['p(95)<1500'],
        },
    },

    soak: createStages([
        { duration: '5m', target: 20 },
        { duration: '3h', target: 20 },
        { duration: '5m', target: 0 },
    ]),

    breakpoint: {
        stages: [
            { duration: '2m', target: 10 },
            { duration: '5m', target: 50 },
            { duration: '5m', target: 100 },
            { duration: '5m', target: 200 },
            { duration: '5m', target: 400 },
        ],
        thresholds: {
            http_req_failed: ['rate<0.1'],
        },
    },
};

/**
 * Get scenario options by name, default to smoke
 */
export const getScenarioOptions = (name: string): Options => scenarios[name] || scenarios.smoke;
