import { COLORS } from "./colors";
import { LOG_LEVEL_PRIORITY } from "./config";

/**
 * Advanced Logger for k6 tests
 */
export class Logger {
  private context?: string;
  private minLevel: string;

  constructor(context?: string, minLevel: string = "DEBUG") {
    this.context = context;
    this.minLevel = minLevel;
  }

  private shouldLog(level: string): boolean {
    const envLevel = __ENV.LOG_LEVEL || this.minLevel;
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[envLevel];
  }

  private colorText(color: string, text: string) {
    return `${color}${text}${COLORS.reset}`;
  }

  private formatMessage(level: string, ...messages: any[]) {
    const timestamp = new Date().toISOString();
    const ctx = this.context ? `[${this.context}]` : "";
    const msg = messages
      .map((m) => (typeof m === "object" ? JSON.stringify(m, null, 2) : m))
      .join(" ");
    return `[${timestamp}] ${level} ${ctx} ${msg}`;
  }

  log(level: string, ...messages: any[]) {
    if (!this.shouldLog(level)) return;

    let color = COLORS.white;
    switch (level) {
      case "DEBUG":
        color = COLORS.magenta;
        break;
      case "INFO":
        color = COLORS.cyan;
        break;
      case "SUCCESS":
        color = COLORS.green;
        break;
      case "WARN":
        color = COLORS.yellow;
        break;
      case "ERROR":
        color = COLORS.red;
        break;
    }

    const formatted = this.colorText(color, this.formatMessage(level, ...messages));

    if (level === "ERROR" || level === "WARN") console.error(formatted);
    else console.log(formatted);
  }

  debug(...messages: any[]) {
    this.log("DEBUG", ...messages);
  }

  info(...messages: any[]) {
    this.log("INFO", ...messages);
  }

  success(...messages: any[]) {
    this.log("SUCCESS", ...messages);
  }

  warn(...messages: any[]) {
    this.log("WARN", ...messages);
  }

  error(...messages: any[]) {
    this.log("ERROR", ...messages);
  }

  /**
   * Request log
   */
  request(method: string, url: string, body?: any) {
    this.info(`REQUEST: ${method} ${url}`);
    if (__ENV.DEBUG === "true" && body) {
      console.log("Body:", JSON.stringify(body, null, 2));
    }
  }

  /**
   * Response log with automatic coloring
   */
  response(status: number, duration: number, body?: any) {
    let level = "INFO";
    if (status >= 500) level = "ERROR";
    else if (status >= 400) level = "WARN";
    else if (status >= 200) level = "SUCCESS";

    this.log(level, `RESPONSE: Status: ${status}, Duration: ${duration}ms`);

    if (__ENV.DEBUG === "true" && body) {
      console.log("Body:", JSON.stringify(body, null, 2));
    }
  }
}

/**
 * Factory
 */
export const createLogger = (context?: string, level?: string) => new Logger(context, level);
export const logger = new Logger();
