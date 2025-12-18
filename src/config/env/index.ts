import { EnvironmentConfig, environments } from "./config";

export const getEnvironment = (): EnvironmentConfig => {
    const envName = __ENV.ENVIRONMENT || 'local';
    return environments[envName] || environments.local;
};
