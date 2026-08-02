import { publicProcedure } from "../trpc/context.ts";
import { z } from "zod";

const postController = {
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
};

export { postController };
