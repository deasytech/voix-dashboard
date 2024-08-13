CREATE TABLE `subscriptions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` varchar(191),
	`stripe_customer_id` varchar(191),
	`stripe_subscription_id` varchar(191),
	`subscribed` boolean,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
