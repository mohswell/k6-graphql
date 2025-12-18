import { firstNames, lastNames, tags, titles, words } from "@/src/data";
import { randomItem } from "@/src/lib/utils";
import { randomBoolean, randomEmail, randomInteger, randomString, randomUsername } from "./variables";


interface User {
    id?: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
}

interface Post {
    title: string;
    content: string;
    authorId: string;
    tags: string[];
    published: boolean;
}

/**
 * User Generator
 */
export class UserGenerator {
    static generate() {
        return {
            id: `user_${randomString(8)}`,
            username: randomUsername(),
            email: randomEmail(),
            password: randomString(12),
            firstName: randomItem(firstNames),
            lastName: randomItem(lastNames),
            age: randomInteger(18, 80),
        };
    }

    static generateBatch(count: number) {
        return Array.from({ length: count }, () => this.generate());
    }
}


/**
 * Post Generator
 */
export class PostGenerator {
    static generate(authorId: string) {
        return {
            id: `post_${randomString(8)}`,
            title: randomItem(titles),
            content: this.generateContent(),
            authorId,
            tags: this.generateTags(),
            published: randomBoolean(),
        };
    }

    static generateBatch(count: number, authorId: string) {
        return Array.from({ length: count }, () => this.generate(authorId));
    }

    private static generateContent(wordCount = 100) {
        return Array.from({ length: wordCount }, () => randomItem(words)).join(' ');
    }

    private static generateTags() {
        return Array.from(
            { length: randomInteger(1, 4) },
            () => randomItem(tags)
        );
    }
}

export class TestData {
    private users: User[] = [];
    private posts: Post[] = [];

    constructor(userCount = 10, postsPerUser = 5) {
        this.users = UserGenerator.generateBatch(userCount);

        this.posts = this.users.flatMap(user =>
            PostGenerator.generateBatch(postsPerUser, user.id!)
        );
    }

    getRandomUser() {
        return randomItem(this.users);
    }

    getRandomPost() {
        return randomItem(this.posts);
    }

    getUsers() {
        return [...this.users];
    }

    getPosts() {
        return [...this.posts];
    }
}
