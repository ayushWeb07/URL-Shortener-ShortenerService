CREATE TABLE `urls` (
	`id` int AUTO_INCREMENT NOT NULL,
	`original_url` text NOT NULL,
	`short_url` varchar(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `urls_id` PRIMARY KEY(`id`),
	CONSTRAINT `urls_short_url_unique` UNIQUE(`short_url`)
);
