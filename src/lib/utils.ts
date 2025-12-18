/**
 * Function to get nested field value from an object using dot notation path
 * @param obj 
 * @param path 
 * @returns 
 */

export function getFieldValue(
    obj: unknown,
    path: string
): unknown {
    return path.split('.').reduce((acc: any, key) => {
        if (acc && typeof acc === 'object') {
            return acc[key];
        }
        return undefined;
    }, obj);
}


/**
 * Select random item from array
 */
export const randomItem = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

/**
 * 
 * @param v 
 * @param errorMessage 
 * @returns 
 * Asserts value and returns an error message
 */

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        throw new Error(errorMessage);
    }

    return v;
}


