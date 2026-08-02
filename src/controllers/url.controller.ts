import { publicProcedure } from "../trpc/context.ts";
import { z } from "zod";
import * as urlService from "../services/url.service.ts";
import { TRPCError } from "@trpc/server";
import { NotFoundError } from "../utils/errors/app.error.ts";

const urlController = {
	createUrl: publicProcedure
		.input(
			z.object({
				originalUrl: z.url(),
			}),
		)
		.mutation(async (opts) => {
			try {
				const { input } = opts;

				// call the url service
				const newUrl = await urlService.createUrl(input.originalUrl);

				return {
					message: "Successfully shortened the url",
					...newUrl,
				};
			} catch (error) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message:
						"An unexpected error occurred while shortening the url, please try again later.",
					cause: error,
				});
			}
		}),

	findAllUrls: publicProcedure.query(async () => {
		try {
			// call the url service
			const urls = await urlService.findAllUrls();

			return {
				message: "Successfully fetched all the urls",
				...urls,
			};
		} catch (error) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message:
					"An unexpected error occurred while fetching all the urls, please try again later.",
				cause: error,
			});
		}
	}),

	findUrlById: publicProcedure
		.input(z.coerce.number().int().nonnegative())
		.query(async (opts) => {
			try {
				const { input } = opts;

				// call the url service
				const url = await urlService.findUrlById(input);

				return {
					message: "Successfully fetched the url by id",
					...url,
				};
			} catch (error) {
				if (error instanceof NotFoundError) {
					throw new TRPCError({
						code: "NOT_FOUND",
						message: "Url with such id not found",
						cause: error,
					});
				}

				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message:
						"An unexpected error occurred while fetching the url by id, please try again later.",
					cause: error,
				});
			}
		}),

	findUrlByShortUrl: publicProcedure
		.input(
			z.coerce
				.string()
				.min(1)
				.max(10)
				.regex(/^[0-9A-Za-z]+$/),
		)
		.query(async (opts) => {
			try {
				const { input } = opts;

				// call the url service
				const url = await urlService.findUrlByShortUrl(input);

				return {
					message: "Successfully fetched the url by short url",
					url,
				};
			} catch (error) {
				if (error instanceof NotFoundError) {
					throw new TRPCError({
						code: "NOT_FOUND",
						message: "Url with such short url not found",
						cause: error,
					});
				}

				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message:
						"An unexpected error occurred while fetching the url by short url, please try again later.",
					cause: error,
				});
			}
		}),

	deleteUrlById: publicProcedure
		.input(
			z.object({
				id: z.number().int().nonnegative(),
			}),
		)
		.mutation(async (opts) => {
			try {
				const { input } = opts;

				// call the url service
				await urlService.deleteUrlById(input.id);

				return {
					message: "Successfully deleted the url by id",
				};
			} catch (error) {
				if (error instanceof NotFoundError) {
					throw new TRPCError({
						code: "NOT_FOUND",
						message: "Url with such id not found",
						cause: error,
					});
				}

				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message:
						"An unexpected error occurred while deleting the url by id, please try again later.",
					cause: error,
				});
			}
		}),
};

export { urlController };
