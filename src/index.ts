import { appRouter } from "./trpc/routers/_app.ts";
import { serverConfig } from "./config/index.ts";
import express from "express";
import { logger } from "./config/logger.config.ts";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./trpc/context.ts";
import { validateRequestUrlParams } from "./validators/request.validator.ts";
import { z } from "zod";
import * as redirectionController from "./controllers/redirection.controller.ts";
import * as healthController from "./controllers/health.controller.ts";

// create the express app
const app = express();

// setup the trpc routers
app.use(
	"/api/v1/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	}),
);

// setup the health endpoint
app.get("/api/v1/health", healthController.checkHealthStatus);

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

app.listen(serverConfig.PORT, () => {
	logger.info(`Server successfully running...`);
});
