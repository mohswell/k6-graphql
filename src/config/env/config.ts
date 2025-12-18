import { assertValue } from "@/src/lib/utils";

export const BASE_URL = __ENV.BASE_URL || 'https://countries.trevorblades.com';
export const DEBUG = __ENV.DEBUG === 'true' || false;

// add for the staging as needed I just have one instance for prod

export interface EnvironmentConfig {
  name: string;
  baseUrl: string;
  graphqlEndpoint?: string;
  token?: string;
  debug?: boolean;
}

export const ENVIRONMENTS: Record<string, string> = {
  local: 'local',
  dev: 'dev',
  staging: 'staging',
  production: 'prod',
}

export const FAKE_URLS: Record<string, string> = {
  local: 'http://localhost:3000',
  dev: 'https://dev.pizza.grafana.fun',
  staging: 'https://pizza.ste.grafana.fun',
}

export const environments: Record<string, EnvironmentConfig> = {
  local: {
    name: ENVIRONMENTS.local,
    baseUrl: FAKE_URLS.local,
    debug: true,
    graphqlEndpoint: '/graphql',
  },
  dev: {
    name: ENVIRONMENTS.dev,
    baseUrl: FAKE_URLS.dev,
    graphqlEndpoint: '/graphql',
    debug: true,
    token: __ENV.DEV_API_TOKEN,
  },
  staging: {
    name: ENVIRONMENTS.staging,
    baseUrl: FAKE_URLS.staging,
    graphqlEndpoint: '/graphql',
    token: __ENV.STAGING_API_TOKEN,
  },
  production: {
    name: ENVIRONMENTS.production,
    baseUrl: BASE_URL!,
    graphqlEndpoint: '/graphql',
    debug: !!DEBUG || false,
    token: __ENV.API_TOKEN,
  },
};