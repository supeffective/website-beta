CREATE TABLE `user_key` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(50) NOT NULL,
	`hashed_password` varchar(255),
	`createdAt` timestamp(3) DEFAULT (now()),
	`updatedAt` timestamp(3) DEFAULT (now()),
	CONSTRAINT `user_key_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` varchar(128) NOT NULL,
	`user_id` varchar(50) NOT NULL,
	`active_expires` bigint NOT NULL,
	`idle_expires` bigint NOT NULL,
	`createdAt` timestamp(3) DEFAULT (now()),
	CONSTRAINT `user_session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `auth_user` (
	`id` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	`username` varchar(50),
	`displayName` varchar(255),
	`avatar` varchar(255),
	`bio` varchar(255),
	`language` varchar(50),
	`subscriptionTier` varchar(50),
	`githubHandle` varchar(50),
	`twitterHandle` varchar(50),
	`discordHandle` varchar(50),
	`twitchHandle` varchar(50),
	`youtubeHandle` varchar(50),
	`createdAt` timestamp(3) DEFAULT (now()),
	`updatedAt` timestamp(3) DEFAULT (now()),
	CONSTRAINT `auth_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `authProviderKey`;--> statement-breakpoint
DROP TABLE `authSession`;--> statement-breakpoint
DROP TABLE `authUser`;
