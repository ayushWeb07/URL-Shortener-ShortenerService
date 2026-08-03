import { createCallerFactory, router } from "../context.ts";

import { userRouter } from "./user.router.ts";
import { postRouter } from "./post.router.ts";
import { urlRouter } from "./url.router.ts";

export const appRouter = router({
	user: userRouter,
	post: postRouter,
	url: urlRouter,
});

export const createCaller = createCallerFactory(appRouter);
export type AppRouter = typeof appRouter;
