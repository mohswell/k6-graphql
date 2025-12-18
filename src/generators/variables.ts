/**
 * Generate random string
 */
export const randomString = (length: number = 10): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

/**
 * Generate random integer between min and max
 */
export const randomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate random email
 */
export const randomEmail = (): string => {
    return `user_${randomString(8)}@gmail.com`;
};

/**
 * Generate random username
 */
export const randomUsername = (): string => {
    return `user_${randomString(10)}`;
};

/**
 * Generate random boolean
 */
export const randomBoolean = (): boolean => {
    return Math.random() > 0.5;
};

/**
 * Generate random date between two dates
 */
export const randomDate = (start: Date, end: Date): Date => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
