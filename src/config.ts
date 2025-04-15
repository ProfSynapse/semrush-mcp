import chalk from 'chalk';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// Define types for configuration variables
interface Config {
  SEMRUSH_API_KEY?: string;
  API_CACHE_TTL_SECONDS: number;
  API_RATE_LIMIT_PER_SECOND: number;
  NODE_ENV: string;
  PORT: number;
  LOG_LEVEL: string;
}

// Define logger interface
interface Logger {
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
}

// Redaction function with type safety
const redactSensitive = (input: any): any => {
  if (typeof input === 'string') {
    return input
      .replace(/[0-9a-fA-F]{32,64}/g, '[REDACTED_KEY]') // Hex keys
      .replace(/[^=&\s]{32,}/g, '[REDACTED_LONG_VALUE]') // Long strings
      .replace(/(api_key|key|token|password)=([^&\s]+)/gi, '$1=[REDACTED]');
  }
  if (input && typeof input === 'object') {
    const sanitized: Record<string, any> = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = key.toLowerCase().includes('key') || key.toLowerCase().includes('secret')
        ? '[REDACTED]'
        : redactSensitive(value);
    }
    return sanitized;
  }
  return input;
};

// Custom logger implementation
export const logger: Logger = {
  error: (...args: any[]) => process.stderr.write(`${chalk.red('[ERROR]')} ${args.map(redactSensitive).join(' ')}\n`),
  warn: (...args: any[]) => process.stderr.write(`${chalk.yellow('[WARN]')} ${args.map(redactSensitive).join(' ')}\n`),
  info: (...args: any[]) => process.stderr.write(`${chalk.blue('[INFO]')} ${args.map(redactSensitive).join(' ')}\n`),
  debug: (...args: any[]) => {
    if (process.env.LOG_LEVEL === 'debug') {
      process.stderr.write(`${chalk.gray('[DEBUG]')} ${args.map(redactSensitive).join(' ')}\n`);
    }
  }
};

// Determine file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ENV_FILE_PATH: string = resolve(__dirname, '..', '.env');

// Load environment variables
const loadEnv = (): void => {
  try {
    const envContent: string = readFileSync(ENV_FILE_PATH, 'utf8');
    const envVars: Record<string, string> = envContent.split('\n').reduce((acc, line) => {
      const [key, value] = line.split('=');
      if (key && value) acc[key.trim()] = value.trim();
      return acc;
    }, {} as Record<string, string>);

    // Set environment variables if not already set
    Object.entries(envVars).forEach(([key, value]) => {
      if (!process.env[key]) {
        process.env[key] = value;
      }
    });

    logger.info('Loaded environment variables from .env file');
  } catch (error: unknown) {
    const message: string = error instanceof Error ? error.message : String(error);
    logger.warn(`No valid .env file found: ${message}. Using environment variables or defaults.`);
  }
};

// Initialize environment
loadEnv();

// Export configuration object using Config interface
export const config: Config = {
  SEMRUSH_API_KEY: process.env.SEMRUSH_API_KEY,
  API_CACHE_TTL_SECONDS: parseInt(process.env.API_CACHE_TTL_SECONDS || '300', 10),
  API_RATE_LIMIT_PER_SECOND: parseInt(process.env.API_RATE_LIMIT_PER_SECOND || '10', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

// Validate environment
export function validateEnv(): void {
  if (!config.SEMRUSH_API_KEY) {
    logger.warn('Missing SEMRUSH_API_KEY. API calls will fail without it.');
  }
}

// Setup logging and status
export function logConfigStatus(): void {
  validateEnv();
  logger.info('Configuration loaded:');
  logger.info(`  • Environment: ${config.NODE_ENV}`);
  logger.info(`  • API Key: ${config.SEMRUSH_API_KEY ? '[PROVIDED]' : '[MISSING]'}`);
  logger.info(`  • Cache TTL: ${config.API_CACHE_TTL_SECONDS} seconds`);
  logger.info(`  • Rate Limit: ${config.API_RATE_LIMIT_PER_SECOND} requests per second`);
  logger.info(`  • Log Level: ${config.LOG_LEVEL}`);
} 