import "dotenv/config";

interface ServerConfig {
	PORT: number;
	REDIS_SERVER_HOST: string;
	REDIS_SERVER_PORT: number;
}

interface DbConfig {
	DATABASE_URL: string;
}

const serverConfig: ServerConfig = {
	PORT: Number(process.env.PORT) || 3000,
	REDIS_SERVER_HOST: process.env.REDIS_SERVER_HOST || "localhost",
	REDIS_SERVER_PORT: Number(process.env.REDIS_SERVER_PORT) || 6379,
};

const dbConfig: DbConfig = {
	DATABASE_URL: process.env.DATABASE_URL || "",
};

export { serverConfig, dbConfig };
