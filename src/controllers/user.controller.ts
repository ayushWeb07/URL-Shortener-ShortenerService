import { publicProcedure } from "../trpc/context.ts";

const userController = {
	list: publicProcedure.query(() => {
		return [
			{
				message: "Hi",
			},
			{
				message: "Hey",
			},
		];
	}),

	getOne: publicProcedure.query(() => {
		return {
			message: "Hi",
		};
	}),
};

export { userController };
