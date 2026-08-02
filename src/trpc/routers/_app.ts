import { router } from "../context.ts";

import { userRouter } from "./user.router.ts";
import { postRouter } from "./post.router.ts";
import { urlRouter } from "./url.router.ts";

const appRouter = router({
	user: userRouter,
	post: postRouter,
	url: urlRouter,
});

export { appRouter };
