import { router, publicProcedure } from "../context.ts";
import { z } from "zod";

const postRouter = router({
	create: publicProcedure
		.input(
			z.object({
				title: z.string(),
			}),
		)
		.mutation((opts) => {
			const { input } = opts;
			return input;
		}),
	list: publicProcedure.query(() => {
		// ...
		return [];
	}),
});

export { postRouter };
