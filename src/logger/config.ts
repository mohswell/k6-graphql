export const DEFAULT_LOG_LEVELS = ["DEBUG", "INFO", "WARN", "ERROR", "SUCCESS"];
export const LOG_LEVEL_PRIORITY: Record<string, number> = {
    DEBUG: 0,
    INFO: 1,
    SUCCESS: 2,
    WARN: 3,
    ERROR: 4,
};

export const DEFAULT_TIMESTAMP_FORMAT = "ISO"; // Currently just ISO string
