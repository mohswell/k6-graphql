import { GraphQLTimedResponse } from "@/src/models";

export class PerformanceMetrics {
    static percentile(values: number[], p: number): number {
        if (!values.length) return 0;

        const sorted = [...values].sort((a, b) => a - b);
        const index = Math.ceil((p / 100) * sorted.length) - 1;

        return sorted[index];
    }

    static average(values: number[]): number {
        if (!values.length) return 0;
        return values.reduce((sum, val) => sum + val, 0) / values.length;
    }

    static summarize<T>(responses: GraphQLTimedResponse<T>[]) {
        if (!responses.length) {
            return {
                count: 0,
                duration: { min: 0, max: 0, avg: 0, p95: 0, p99: 0 },
                waiting: { min: 0, max: 0, avg: 0, p95: 0, p99: 0 },
            };
        }

        const durations = responses.map(r => r.timings.duration);
        const waiting = responses.map(r => r.timings.waiting);

        return {
            count: responses.length,
            duration: {
                min: Math.min(...durations),
                max: Math.max(...durations),
                avg: this.average(durations),
                p95: this.percentile(durations, 95),
                p99: this.percentile(durations, 99),
            },
            waiting: {
                min: Math.min(...waiting),
                max: Math.max(...waiting),
                avg: this.average(waiting),
                p95: this.percentile(waiting, 95),
                p99: this.percentile(waiting, 99),
            },
        };
    }
}
