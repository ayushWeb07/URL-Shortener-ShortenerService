import { serverConfig } from "./";
import { Redis } from "ioredis";
import { logger } from "./logger.config.ts";

class RedisConnection {
	private static connection: Redis | null = null;

	private constructor() {
		logger.info("Initiating Redis connection...");
	}

	public static getConnectionObject(): Redis {
		if (!this.connection) {
			this.connection = new Redis({
				port: serverConfig.REDIS_SERVER_PORT,
				host: serverConfig.REDIS_SERVER_HOST,
				maxRetriesPerRequest: null,
			});

			this.connection.on("connect", () => {
				logger.info("Connecting to Redis...")
			})

			this.connection.on("ready", () => {
				logger.info("Successfully connected to Redis")
			})

			this.connection.on("error", (error) => {
				logger.error(`Something went wrong while connecting to redis: ${error}`)
			})

			this.connection.on("end", () => {
				logger.info("Redis connection has been closed")
			})
		}

		return this.connection;
	}
}

export { RedisConnection };
