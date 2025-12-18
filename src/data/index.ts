/**
 * Sample country codes
 */
export const countryCodes: string[] = [
    'US', 'GB', 'FR', 'DE', 'IT', 'ES', 'CA', 'MX', 'BR', 'JP',
    'CN', 'IN', 'AU', 'NZ', 'ZA', 'NG', 'EG', 'KR', 'SG', 'ID',
    'TH', 'VN', 'PH', 'MY', 'PK', 'BD', 'LK', 'NG', 'KE', 'GH',
    'TR', 'SA', 'AE', 'IL', 'IR', 'IQ', 'RU', 'UA', 'PL', 'SE',
    'NO', 'DK', 'FI', 'NL', 'BE', 'CH', 'AT', 'CZ', 'HU', 'RO',
];

/**
 * Sample continent codes
 */
export const continentCodes: string[] = [
    'AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA',
];

/**
 * Sample currencies
 */
export const currencies: string[] = [
    'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'AUD', 'CAD', 'CHF', 'SEK',
    'NOK', 'DKK', 'ISK', 'HUF', 'CZK', 'PLN', 'RON', 'BGN', 'HRK', 'RUB',
    'BRL', 'MXN', 'CLP', 'ARS', 'ZAR', 'EGP', 'NGN', 'KES', 'GHS', 'TZS',
    'SAR', 'AED', 'KWD', 'QAR', 'OMR', 'BHD', 'JOD', 'ILS', 'TRY', 'IQD',
];

/**
 * Sample languages
 */
export const languages: { code: string; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ru', name: 'Russian' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ko', name: 'Korean' },
    { code: 'ar', name: 'Arabic' },
    { code: 'tr', name: 'Turkish' },
    { code: 'pl', name: 'Polish' },
    { code: 'th', name: 'Thai' },
];


/**
 * First Name and Laast Name for Random User Generation
 */
export const firstNames: string[] = [
    'John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Hank',
    'Ivy', 'Jack', 'Kathy', 'Leo', 'Mona', 'Nate', 'Olivia', 'Paul', 'Quinn', 'Rose',
];

export const lastNames: string[] = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
];

/**
 * Posts Generator
 */

export const titles: string[] = [
    'Introduction to Load Testing',
    'GraphQL Best Practices',
    'Performance Optimization Tips',
    'Scaling Web Applications',
    'Modern API Design',
    'Microservices Architecture',
    'Cloud Computing Fundamentals',
    'DevOps Workflow',
    'Continuous Integration Guide',
    'Security Best Practices',
];

/**
 *  Words for Post Content Generation
 * */
export const words: string[] = [
    'performance', 'scalability', 'optimization', 'architecture', 'design',
    'implementation', 'testing', 'deployment', 'monitoring', 'automation',
    'integration', 'development', 'production', 'infrastructure', 'cloud',
];

/**
 * Tags Generator
 */
export const tags: string[] = [
    'tech', 'programming', 'tutorial', 'guide', 'tips', 'best-practices',
    'performance', 'graphql', 'load-testing', 'devops', 'cloud', 'api',
];

export default {
    countryCodes,
    continentCodes,
    currencies,
    languages,
    firstNames,
    lastNames,
    titles,
    words,
    tags,
};



