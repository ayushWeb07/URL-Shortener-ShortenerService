import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./trpc/routers/_app.ts";
import { serverConfig } from "./config/index.ts";

const server = createHTTPServer({
	router: appRouter,
});

server.listen(serverConfig.PORT);
