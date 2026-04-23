CREATE TABLE `resourceDownloads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`quizResponseId` int NOT NULL,
	`resourceType` varchar(50) NOT NULL,
	`resourceName` varchar(255) NOT NULL,
	`downloadedAt` timestamp NOT NULL DEFAULT (now()),
	`userAgent` text,
	`ipAddress` varchar(45),
	CONSTRAINT `resourceDownloads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `resourceDownloads` ADD CONSTRAINT `resourceDownloads_quizResponseId_quizResponses_id_fk` FOREIGN KEY (`quizResponseId`) REFERENCES `quizResponses`(`id`) ON DELETE cascade ON UPDATE no action;