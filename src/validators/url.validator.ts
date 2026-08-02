import z from "zod";

const createUrlValidator = z.object({
	originalUrl: z.url(),
	shortUrl: z.url(),
});

const findUrlByIdValidator = z.object({
	id: z.coerce.number().int().nonnegative(),
});

const findUrlByShortUrlValidator = z.object({
	shortUrl: z.url(),
});

const deleteUrlByIdValidator = z.object({
	id: z.coerce.number().int().nonnegative(),
});

export {
	createUrlValidator,
	findUrlByIdValidator,
	findUrlByShortUrlValidator,
	deleteUrlByIdValidator,
};
