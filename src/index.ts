import { appRouter } from "./trpc/routers/_app.ts";
import { serverConfig } from "./config/index.ts";
import express from "express";

import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./trpc/context.ts";
import { validateRequestUrlParams } from "./validators/request.validator.ts";
import { z } from "zod";
import * as redirectionController from "./controllers/redirection.controller.ts";

// create the express app
const app = express();

// setup the trpc routers
app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	}),
);

// setup the redirection route
app.get(
	"/:shortUrl",
	validateRequestUrlParams(
		z.object({
			shortUrl: z.coerce
				.string()
				.min(1)
				.max(10)
				.regex(/^[0-9A-Za-z]+$/),
		}),
	),
	redirectionController.redirectShortUrl,
);

app.listen(serverConfig.PORT);
