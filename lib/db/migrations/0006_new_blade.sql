ALTER TABLE `auth_user` MODIFY COLUMN `email` varchar(255);--> statement-breakpoint
ALTER TABLE `auth_user` ADD CONSTRAINT `auth_user_email_unique` UNIQUE(`email`);--> statement-breakpoint
ALTER TABLE `auth_user` ADD CONSTRAINT `auth_user_username_unique` UNIQUE(`username`);