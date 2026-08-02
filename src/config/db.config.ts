import mongoose from "mongoose";
import { dbConfig } from "./index.ts";
import { logger } from "./logger.config.ts";

const connectToDb = async () => {
	try {
		await mongoose.connect(dbConfig.DATABASE_URL);
		logger.info("Successfully connected to the DB");
	} catch (err) {
		logger.error(`Something went wrong while connecting to db: ${err}`);
		throw err;
	}
};

export { connectToDb };
