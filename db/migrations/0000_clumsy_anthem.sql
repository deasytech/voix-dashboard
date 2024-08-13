CREATE TABLE `feedbacks` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`project_id` bigint unsigned NOT NULL,
	`user_name` varchar(45),
	`user_email` varchar(45),
	`message` text,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `feedbacks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`url` varchar(191) NOT NULL,
	`user_id` varchar(191),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `feedbacks` ADD CONSTRAINT `feedbacks_project_id_projects_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE no action ON UPDATE no action;