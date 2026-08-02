import { router } from "../context.ts";

import { userRouter } from "./user.router.ts";
import { postRouter } from "./post.router.ts";

const appRouter = router({
	user: userRouter,
	post: postRouter,
});

export { appRouter };
