import z from "zod";

const createUrlValidator = z.object({
	originalUrl: z.url(),
	shortUrl: z.url(),
});

export { createUrlValidator };
