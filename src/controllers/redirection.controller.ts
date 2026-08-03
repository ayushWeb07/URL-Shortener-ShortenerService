import type { Request, Response } from "express";
import { createCaller } from "../trpc/routers/_app.ts";

const redirectShortUrl = async (req: Request, res: Response) => {
	try {
		const { shortUrl } = req.params;

		const caller = createCaller({});

		// call the trpc function
		const urlData = await caller.url.findUrlByShortUrl(shortUrl);

		res.redirect(urlData.url);
	} catch (error) {
		throw error;
	}
};

export { redirectShortUrl };
