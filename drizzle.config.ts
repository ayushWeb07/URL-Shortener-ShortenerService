import { defineConfig } from 'drizzle-kit';
import { dbConfig } from "./src/config";

export default defineConfig({
    out: './src/database/migrations',
    schema: './src/database/schemas',
    dialect: 'mysql',
    dbCredentials: {
        url: dbConfig.DATABASE_URL,
    },
});
