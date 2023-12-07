CREATE TABLE `authProviderKey` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(255),
	`session_state` varchar(255),
	CONSTRAINT `authProviderKey_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `authSession` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `authSession_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `authUser` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	`bio` varchar(255),
	`characterAvatar` varchar(50),
	`preferredLanguage` varchar(50),
	`username` varchar(50),
	`githubUsername` varchar(50),
	`twitterUsername` varchar(50),
	`discordUsername` varchar(50),
	`twitchUsername` varchar(50),
	`youtubeUsername` varchar(50),
	`patreonTier` varchar(50),
	CONSTRAINT `authUser_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `account` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `verificationToken` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `account` ADD PRIMARY KEY(`provider`,`providerAccountId`);--> statement-breakpoint
ALTER TABLE `verificationToken` ADD PRIMARY KEY(`identifier`,`token`);