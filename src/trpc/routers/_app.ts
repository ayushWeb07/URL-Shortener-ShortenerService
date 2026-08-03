import { createCallerFactory, router } from "../context.ts";

import { urlRouter } from "./url.router.ts";

export const appRouter = router({
	urls: urlRouter,
});

export const createCaller = createCallerFactory(appRouter);
export type AppRouter = typeof appRouter;
