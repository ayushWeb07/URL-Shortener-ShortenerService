// get the redis connection
import { RedisConnection } from "../config/redis.config.ts";
import type {
	AddNewUrlMappingDto,
	DeleteUrlMappingDto,
	GetUrlMappingDto,
} from "../dtos/redis.dto.ts";
import { serverConfig } from "../config";

const redisConn = RedisConnection.getConnectionObject();

// get new url uid
const getNewUrlUid = async (): Promise<number> => {
	return await redisConn.incr(serverConfig.REDIS_INCR_COUNTER_KEY);
};

// add new url mapping
const addNewUrlMapping = async (
	urlData: AddNewUrlMappingDto,
): Promise<void> => {
	await redisConn.set(
		`urls:${urlData.shortUrl}`,
		urlData.originalUrl,
		"EX",
		60 * 60 * 24 * 3,
	);
};

// get url mapping
const getUrlMapping = async (
	urlData: GetUrlMappingDto,
): Promise<string | null> => {
	return await redisConn.get(`urls:${urlData.shortUrl}`);
};

// delete url mapping
const deleteUrlMapping = async (
	urlData: DeleteUrlMappingDto,
): Promise<number> => {
	return await redisConn.del(`urls:${urlData.shortUrl}`);
};

export { getNewUrlUid, addNewUrlMapping, getUrlMapping, deleteUrlMapping };
