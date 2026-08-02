import { logger } from "../config/logger.config.ts";
import {
	CreateUrlDto,
	DeleteUrlByIdDto,
	FindUrlByIdDto,
	FindUrlByShortUrlDto,
} from "../dtos/url.dto.ts";
import {
	InternalServerError,
	NotFoundError,
} from "../utils/errors/app.error.ts";

import { db } from "../config/db.config.ts";
import { urls } from "../database/schemas/url.ts";
import { eq } from "drizzle-orm";

// create url
const createUrl = async (urlData: CreateUrlDto) => {
	try {
		// create the new url
		const [newUrl] = await db
			.insert(urls)
			.values({
				originalUrl: urlData.originalUrl,
				shortUrl: urlData.shortUrl,
			})
			.$returningId();

		logger.info("Urls: createUrl endpoint -> success", {
			id: newUrl.id,
		});
	} catch (error) {
		logger.error("Urls: createUrl endpoint -> failure", error);

		throw new InternalServerError(
			"Something went wrong while creating the short url",
			error instanceof Error ? error.stack : undefined,
		);
	}
};

// find all urls
const findAllUrls = async () => {
	try {
		const allUrls = await db.select().from(urls);

		logger.info("Urls: findAllUrls endpoint -> success", {
			count: allUrls.length,
		});

		return allUrls;
	} catch (error) {
		logger.error("Urls: findAllUrls endpoint -> failure", error);

		throw new InternalServerError(
			"Something went wrong while finding all the urls",
			error instanceof Error ? error.stack : undefined,
		);
	}
};

// find url by id
const findUrlById = async (urlData: FindUrlByIdDto) => {
	try {
		const [url] = await db.select().from(urls).where(eq(urls.id, urlData.id));

		if (!url) {
			logger.error("Urls: findUrlById endpoint -> failure", {
				id: urlData.id,
				error: "Url not found",
			});

			throw new NotFoundError("Url not found");
		} else {
			logger.info("Urls: findUrlById endpoint -> success", url);

			return url;
		}
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("Urls: findUrlById endpoint -> failure", error);

			throw new InternalServerError(
				"Something went wrong while finding the url by id",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

// find by short url
const findUrlByShortUrl = async (urlData: FindUrlByShortUrlDto) => {
	try {
		const [url] = await db
			.select()
			.from(urls)
			.where(eq(urls.shortUrl, urlData.shortUrl));

		if (!url) {
			logger.error("Urls: findUrlByShortUrl endpoint -> failure", {
				shortUrl: urlData.shortUrl,
				error: "Url not found",
			});

			throw new NotFoundError("Url not found");
		} else {
			logger.info("Urls: findUrlByShortUrl endpoint -> success", url);

			return url;
		}
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("Urls: findUrlByShortUrl endpoint -> failure", error);

			throw new InternalServerError(
				"Something went wrong while finding the url by short url",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

// delete url by id
const deleteUrlById = async (urlData: DeleteUrlByIdDto) => {
	try {
		const [result] = await db.delete(urls).where(eq(urls.id, urlData.id));

		if (result.affectedRows === 0) {
			logger.error("Urls: deleteUrlById endpoint -> failure", {
				id: urlData.id,
				error: "Url not found",
			});

			throw new NotFoundError("Url not found");
		}

		logger.info("Urls: deleteUrlById endpoint -> success", {
			id: urlData.id,
		});
	} catch (error) {
		if (error instanceof NotFoundError) {
			throw error;
		} else {
			logger.error("Urls: deleteUrlById endpoint -> failure", error);

			throw new InternalServerError(
				"Something went wrong while deleting the url",
				error instanceof Error ? error.stack : undefined,
			);
		}
	}
};

export {
	createUrl,
	findAllUrls,
	findUrlById,
	findUrlByShortUrl,
	deleteUrlById,
};
