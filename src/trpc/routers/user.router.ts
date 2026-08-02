import { router, publicProcedure } from "../context.ts";
// import { z } from "zod";

const userRouter = router({
	list: publicProcedure.query(() => {
		return [];
	}),
});

export { userRouter };
