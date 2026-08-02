import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { z, type ZodObject } from "zod";

// validate the req url params for a specific zod object
const validateRequestUrlParams = (schema: ZodObject) => {
	// return a middleware validating req url params
	return async (req: Request, res: Response, next: NextFunction) => {
		const result = await schema.safeParseAsync(req.params);

		if (result.success) {
			next();
		} else {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: "Invalid request URL params",
				success: false,
				error: z.flattenError(result.error),
			});
		}
	};
};

export { validateRequestUrlParams };
