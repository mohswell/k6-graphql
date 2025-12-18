// Write-Heavy Scenario - High mutation rate
// Simulates content creation, updates, and deletions
import { sleep } from 'k6';
import { GraphQLClient } from '../clients/api';
import { mutations, createRequest } from '../graphql/operations';
import { UserGenerator, PostGenerator, CommentGenerator, randomItem } from '../generators/variables';
import { CheckHelpers, ErrorHandler } from '../lib/validators';
import { createLogger } from '../logger/logger';

const logger = createLogger('WriteHeavy');

/**
 * Write-Heavy Scenario: 70% writes, 30% reads
 * Creates, updates, and deletes content
 */
export class WriteHeavyScenario {
    private client: GraphQLClient;
    private createdUserIds: string[] = [];
    private createdPostIds: string[] = [];

    constructor(client: GraphQLClient) {
        this.client = client;
    }

    /**
     * Execute write-heavy scenario
     */
    execute() {
        const actions = [
            { weight: 30, action: () => this.createUser() },
            { weight: 30, action: () => this.createPost() },
            { weight: 20, action: () => this.createComment() },
            { weight: 10, action: () => this.updatePost() },
            { weight: 10, action: () => this.deletePost() },
        ];

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

        sleep(0.5); // Shorter think time for write-heavy
    }

    /**
     * Create new user
     */
    private createUser() {
        const userData = UserGenerator.generate();
        const request = createRequest(mutations.createUser, { input: userData });

        const response = this.client.query(request);
        CheckHelpers.graphqlSuccess(response, 'CreateUser');

        if (response.ok && response.body.data) {
            const userId = (response.body.data as any).createUser?.id;
            if (userId) {
                this.createdUserIds.push(userId);
                logger.info(`User created: ${userId}`);
            }
        } else {
            ErrorHandler.handle(response, false, 'CreateUser');
        }
    }

    /**
     * Create new post
     */
    private createPost() {
        const authorId = this.createdUserIds.length > 0 
            ? randomItem(this.createdUserIds) 
            : `user_${Math.random().toString(36).slice(2)}`;

        const postData = PostGenerator.generate(authorId);
        const request = createRequest(mutations.createPost, { input: postData });

        const response = this.client.query(request);
        CheckHelpers.graphqlSuccess(response, 'CreatePost');

        if (response.ok && response.body.data) {
            const postId = (response.body.data as any).createPost?.id;
            if (postId) {
                this.createdPostIds.push(postId);
                logger.info(`Post created: ${postId}`);
            }
        } else {
            ErrorHandler.handle(response, false, 'CreatePost');
        }
    }

    /**
     * Create comment on post
     */
    private createComment() {
        if (this.createdPostIds.length === 0) {
            logger.warn('No posts available for commenting');
            return;
        }

        const postId = randomItem(this.createdPostIds);
        const authorId = this.createdUserIds.length > 0 
            ? randomItem(this.createdUserIds) 
            : `user_${Math.random().toString(36).slice(2)}`;

        const commentData = CommentGenerator.generate(postId, authorId);
        const request = createRequest(mutations.createComment, { input: commentData });

        const response = this.client.query(request);
        CheckHelpers.graphqlSuccess(response, 'CreateComment');

        if (!response.ok) {
            ErrorHandler.handle(response, false, 'CreateComment');
        }
    }

    /**
     * Update existing post
     */
    private updatePost() {
        if (this.createdPostIds.length === 0) {
            logger.warn('No posts available for updating');
            return;
        }

        const postId = randomItem(this.createdPostIds);
        const updateData = {
            title: `Updated: ${PostGenerator.generate().title}`,
            content: PostGenerator.generateContent(50),
        };

        const request = createRequest(mutations.updatePost, { 
            id: postId, 
            input: updateData 
        });

        const response = this.client.query(request);
        CheckHelpers.graphqlSuccess(response, 'UpdatePost');

        if (!response.ok) {
            ErrorHandler.handle(response, false, 'UpdatePost');
        }
    }

    /**
     * Delete post
     */
    private deletePost() {
        if (this.createdPostIds.length === 0) {
            logger.warn('No posts available for deletion');
            return;
        }

        const postId = this.createdPostIds.pop()!; // Remove from array
        const request = createRequest(mutations.deletePost, { id: postId });

        const response = this.client.query(request);
        CheckHelpers.graphqlSuccess(response, 'DeletePost');

        if (response.ok) {
            logger.info(`Post deleted: ${postId}`);
        } else {
            ErrorHandler.handle(response, false, 'DeletePost');
        }
    }
}

/**
 * Execute write-heavy scenario
 */
export const executeWriteHeavy = (client: GraphQLClient) => {
    const scenario = new WriteHeavyScenario(client);
    scenario.execute();
};
