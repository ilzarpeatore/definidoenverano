CREATE TABLE `informedConsents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerId` int NOT NULL,
	`orderId` int NOT NULL,
	`consentText` text NOT NULL,
	`ipAddress` varchar(45) NOT NULL,
	`userAgent` text,
	`consentedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `informedConsents_id` PRIMARY KEY(`id`)
);
