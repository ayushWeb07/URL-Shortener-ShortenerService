import type { Request, Response } from "express";
import { createCaller } from "../trpc/routers/_app.ts";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

const redirectShortUrl = async (req: Request, res: Response) => {
	try {
		const { shortUrl } = req.params;

		const caller = createCaller({});

		// call the trpc function
		const urlData = await caller.url.findUrlByShortUrl(shortUrl);

		res.redirect(urlData.url);
	} catch (error) {
		if (error instanceof TRPCError) {
			const httpCode = getHTTPStatusCodeFromError(error);

			res.status(httpCode).json({
				name: error.name,
				message: error.message,
				cause: error?.cause || null,
			});
		}
		throw error;
	}
};

export { redirectShortUrl };
