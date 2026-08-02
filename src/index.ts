import { appRouter } from "./trpc/routers/_app.ts";
import { serverConfig } from "./config/index.ts";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./trpc/context.ts";

// create the express app
const app = express();

app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	}),
);

app.listen(serverConfig.PORT);
