// Read-Heavy Scenario - Simulates read-heavy workload
// Common for content consumption, browsing, search
import { randomInt } from 'crypto';
import { sleep } from 'k6';
import { createRequest, queries, CheckHelpers, ErrorHandler, randomItem } from '..';
import { GraphQLClient } from '../clients/api';
import { createLogger } from '../logger';

const logger = createLogger('ReadHeavy');

/** 
 * Read-Heavy Scenario: Browse content without mutations
 * 90% reads, 10% search
 */
export class ReadHeavyScenario {
    private client: GraphQLClient;
    private cachedUserIds: string[] = [];
    private cachedPostIds: string[] = [];

    constructor(client: GraphQLClient) {
        this.client = client;
        this.initializeCache();
    }

    /**
     * Initialize with some IDs from initial queries
     */
    private initializeCache() {
        // Get some posts to populate cache
        const request = createRequest(queries.getPosts, { limit: 50 });
        const response = this.client.query(request);

        if (response.ok && response.body.data) {
            const posts = (response.body.data as any).posts || [];
            this.cachedPostIds = posts.map((p: any) => p.id);
            
            // Extract unique author IDs
            const authorIds = new Set(posts.map((p: any) => p.authorId).filter(Boolean));
            this.cachedUserIds = Array.from(authorIds) as string[];
        }
    }

    /**
     * Execute read-heavy scenario
     */
    execute() {
        const actions = [
            { weight: 40, action: () => this.browsePosts() },
            { weight: 30, action: () => this.readPostDetails() },
            { weight: 20, action: () => this.browseUsers() },
            { weight: 10, action: () => this.searchContent() },
        ];

        // Select action based on weight
        const totalWeight = actions.reduce((sum, a) => sum + a.weight, 0);
        const random = Math.random() * totalWeight;
        
        let cumulative = 0;
        for (const { weight, action } of actions) {
            cumulative += weight;
            if (random <= cumulative) {
                action();
                break;
            }
        }

        sleep(randomInt(1, 3)); // Random think time
    }

    /**
     * Browse posts with pagination
     */
    private browsePosts() {
        const offset = randomInt(0, 100);
        const request = createRequest(queries.getPosts, { limit: 20, offset });

        const response = this.client.query(request);
        CheckHelpers.graphqlSuccess(response, 'BrowsePosts');

        if (response.ok && response.body.data) {
            const posts = (response.body.data as any).posts || [];
            // Update cache
            posts.forEach((p: any) => {
                if (p.id && !this.cachedPostIds.includes(p.id)) {
                    this.cachedPostIds.push(p.id);
                }
            });
        } else {
            ErrorHandler.handle(response, false, 'BrowsePosts');
        }
    }

    /**
     * Read specific post with comments
     */
    private readPostDetails() {
        if (this.cachedPostIds.length === 0) {
            logger.warn('No cached post IDs, skipping readPostDetails');
            return;
        }

        const postId = randomItem(this.cachedPostIds);
        const request = createRequest(queries.getPostById, { id: postId });

        const response = this.client.query(request);
        CheckHelpers.graphqlSuccess(response, 'ReadPostDetails');

        if (!response.ok) {
            ErrorHandler.handle(response, false, 'ReadPostDetails');
        }
    }

    /**
     * Browse users
     */
    private browseUsers() {
        const offset = randomInt(0, 50);
        const request = createRequest(queries.getAllUsers, { limit: 20, offset });

        const response = this.client.query(request);
        CheckHelpers.graphqlSuccess(response, 'BrowseUsers');

        if (response.ok && response.body.data) {
            const users = (response.body.data as any).users || [];
            users.forEach((u: any) => {
                if (u.id && !this.cachedUserIds.includes(u.id)) {
                    this.cachedUserIds.push(u.id);
                }
            });
        } else {
            ErrorHandler.handle(response, false, 'BrowseUsers');
        }
    }

    /**
     * Search content
     */
    private searchContent() {
        const searchQueries = ['test', 'performance', 'load', 'graphql', 'optimization'];
        const query = randomItem(searchQueries);
        
        const request = createRequest(queries.search, { query });

        const response = this.client.query(request);
        CheckHelpers.graphqlSuccess(response, 'SearchContent');

        if (!response.ok) {
            ErrorHandler.handle(response, false, 'SearchContent');
        }
    }
}

/**
 * Execute read-heavy scenario
 */
export const executeReadHeavy = (client: GraphQLClient) => {
    const scenario = new ReadHeavyScenario(client);
    scenario.execute();
};
