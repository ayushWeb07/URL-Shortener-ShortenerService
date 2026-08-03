import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const checkHealthStatus = async (req: Request, res: Response) => {
	try {
		res.status(StatusCodes.OK).json({
			status: "UP",
			uptime: process.uptime(),
			timestamp: Date.now(),
		});
	} catch (error) {
		res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
			status: "DOWN",
			message: error,
		});
	}
};

export { checkHealthStatus };
