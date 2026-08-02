import {
	mysqlTable,
	int,
	timestamp,
	varchar,
	text,
} from "drizzle-orm/mysql-core";

export const urls = mysqlTable("urls", {
	id: int("id").primaryKey().autoincrement(),
	originalUrl: text("original_url").notNull(),
	shortUrl: varchar("short_url", { length: 10 }).unique().notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});
