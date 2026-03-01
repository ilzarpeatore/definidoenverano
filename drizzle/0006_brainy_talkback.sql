CREATE TABLE `freeWeekSignups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`firstName` varchar(100) NOT NULL,
	`objective` varchar(100) NOT NULL,
	`experience` varchar(50) NOT NULL,
	`availableTime` varchar(50) NOT NULL,
	`yearsTraining` varchar(50) NOT NULL,
	`accessToken` varchar(255) NOT NULL,
	`accessExpiresAt` timestamp NOT NULL,
	`status` enum('active','expired','converted') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `freeWeekSignups_id` PRIMARY KEY(`id`),
	CONSTRAINT `freeWeekSignups_email_unique` UNIQUE(`email`),
	CONSTRAINT `freeWeekSignups_accessToken_unique` UNIQUE(`accessToken`)
);
