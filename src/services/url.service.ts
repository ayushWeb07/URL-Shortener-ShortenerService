// create url
import * as urlRepository from "../repositories/url.repository.ts";
import * as redisRepository from "../repositories/redis.repository.ts";
import { encodeBase62 } from "../utils/base62.util.ts";
import { serverConfig } from "../config/index.ts";

const createUrl = async (
	originalUrl: string,
): Promise<{
	originalUrl: string;
	shortUrl: string;
	fullUrl: string;
}> => {
	// get the uid
	const newUid = await redisRepository.getNewUrlUid();

	// base 2 encode
	const shortUrl = encodeBase62(BigInt(newUid));

	// call the url repository
	await urlRepository.createUrl({
		originalUrl,
		shortUrl,
	});

	// call the redis repository
	await redisRepository.addNewUrlMapping({
		originalUrl,
		shortUrl,
	});

	// format the short url
	const fullUrl = `${serverConfig.BASE_URL}/${shortUrl}`;

	return {
		originalUrl,
		shortUrl,
		fullUrl,
	};
};

// find all urls
const findAllUrls = async (): Promise<
	{
		id: number;
		originalUrl: string;
		shortUrl: string;
		createdAt: Date;
		updatedAt: Date;
	}[]
> => {
	const urls = await urlRepository.findAllUrls();
	return urls;
};

// find url by id
const findUrlById = async (
	id: number,
): Promise<{
	id: number;
	originalUrl: string;
	shortUrl: string;
	createdAt: Date;
	updatedAt: Date;
}> => {
	const url = await urlRepository.findUrlById({
		id,
	});

	return url;
};

// find by short url
const findUrlByShortUrl = async (shortUrl: string): Promise<string> => {
	// find from cache
	const originalUrlFromCache = await redisRepository.getUrlMapping({
		shortUrl,
	});

	if (originalUrlFromCache) {
		return originalUrlFromCache;
	}

	// if miss, query db
	const fetchedUrl = await urlRepository.findUrlByShortUrl({
		shortUrl,
	});

	return fetchedUrl.originalUrl;
};

// delete url by id
const deleteUrlById = async (id: number): Promise<void> => {
	// find from url repository
	const url = await urlRepository.findUrlById({
		id,
	});

	// delete from url repository
	await urlRepository.deleteUrlById({
		id,
	});

	// delete from redis repository
	await redisRepository.deleteUrlMapping({
		shortUrl: url.shortUrl,
	});
};

export {
	createUrl,
	findAllUrls,
	findUrlById,
	findUrlByShortUrl,
	deleteUrlById,
};
