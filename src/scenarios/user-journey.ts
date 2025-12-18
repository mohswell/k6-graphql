// User Journey Scenario - Complete user flow
// Demonstrates realistic user behavior for load testing
import { sleep } from 'k6';
import { GraphQLClient } from '../clients/api';
import { queries, mutations, createRequest } from '../graphql/operations';
import { UserGenerator, PostGenerator, CommentGenerator } from '../generators/variables';
import { CheckHelpers, ErrorHandler } from '../lib/validators';
import { createLogger } from '../logger/logger';

const logger = createLogger('UserJourney');

/**
 * User Journey: Registration -> Create Posts -> Read Posts -> Comment -> Update Profile
 */
export class UserJourneyScenario {
    private client: GraphQLClient;
    private userId?: string;
    private postId?: string;

    constructor(client: GraphQLClient) {
        this.client = client;
    }

    /**
     * Execute complete user journey
     */
    execute() {
        this.register();
        sleep(1); // Think time between actions

        this.createPost();
        sleep(1);

        this.readPosts();
        sleep(1);

        this.readPostDetails();
        sleep(1);

        this.createComment();
        sleep(1);

        this.updateProfile();
        sleep(1);

        this.cleanup();
    }

    /**
     * Step 1: User registration
     */
    private register() {
        const userData = UserGenerator.generate();
        const request = createRequest(mutations.createUser, { input: userData });

        const response = this.client.query(request);
        
        CheckHelpers.graphqlSuccess(response, 'CreateUser');
        
        if (response.ok && response.body.data) {
            this.userId = (response.body.data as any).createUser?.id;
            logger.success(`User registered: ${this.userId}`);
        } else {
            ErrorHandler.handle(response, false, 'Registration');
        }
    }

    /**
     * Step 2: Create a post
     */
    private createPost() {
        if (!this.userId) {
            logger.warn('Skipping createPost: No userId');
            return;
        }

        const postData = PostGenerator.generate(this.userId);
        const request = createRequest(mutations.createPost, { input: postData });

        const response = this.client.query(request);
        
        CheckHelpers.graphqlSuccess(response, 'CreatePost');

        if (response.ok && response.body.data) {
            this.postId = (response.body.data as any).createPost?.id;
            logger.success(`Post created: ${this.postId}`);
        } else {
            ErrorHandler.handle(response, false, 'CreatePost');
        }
    }

    /**
     * Step 3: Read posts feed
     */
    private readPosts() {
        const request = createRequest(queries.getPosts, { limit: 20, offset: 0 });

        const response = this.client.query(request);
        
        CheckHelpers.graphqlSuccess(response, 'GetPosts');
        CheckHelpers.hasField(response, 'posts', 'Posts array exists');

        if (!response.ok) {
            ErrorHandler.handle(response, false, 'GetPosts');
        }
    }

    /**
     * Step 4: Read specific post details
     */
    private readPostDetails() {
        if (!this.postId) {
            logger.warn('Skipping readPostDetails: No postId');
            return;
        }

        const request = createRequest(queries.getPostById, { id: this.postId });

        const response = this.client.query(request);
        
        CheckHelpers.graphqlSuccess(response, 'GetPostById');

        if (!response.ok) {
            ErrorHandler.handle(response, false, 'GetPostById');
        }
    }

    /**
     * Step 5: Create a comment
     */
    private createComment() {
        if (!this.postId || !this.userId) {
            logger.warn('Skipping createComment: Missing postId or userId');
            return;
        }

        const commentData = CommentGenerator.generate(this.postId, this.userId);
        const request = createRequest(mutations.createComment, { input: commentData });

        const response = this.client.query(request);
        
        CheckHelpers.graphqlSuccess(response, 'CreateComment');

        if (!response.ok) {
            ErrorHandler.handle(response, false, 'CreateComment');
        }
    }

    /**
     * Step 6: Update user profile
     */
    private updateProfile() {
        if (!this.userId) {
            logger.warn('Skipping updateProfile: No userId');
            return;
        }

        const updateData = {
            firstName: 'Updated',
            lastName: 'User',
        };
        const request = createRequest(mutations.updateUser, { 
            id: this.userId, 
            input: updateData 
        });

        const response = this.client.query(request);
        
        CheckHelpers.graphqlSuccess(response, 'UpdateUser');

        if (!response.ok) {
            ErrorHandler.handle(response, false, 'UpdateUser');
        }
    }

    /**
     * Cleanup: Delete created data
     */
    private cleanup() {
        // In real scenarios, you might want to clean up test data
        // For load testing, we typically don't clean up to avoid extra load
        logger.info('Journey completed');
    }
}

/**
 * Execute user journey scenario
 */
export const executeUserJourney = (client: GraphQLClient) => {
    const journey = new UserJourneyScenario(client);
    journey.execute();
};
