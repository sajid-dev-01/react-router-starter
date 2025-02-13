CREATE TABLE `accounts` (
	`userId` text NOT NULL,
	`accountType` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refreshToken` text,
	`accessToken` text,
	`expiresAt` integer,
	`tokenType` text,
	`scope` text,
	`idToken` text,
	`sessionState` text,
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `role` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`permissions` text,
	`createdAt` integer DEFAULT '"2025-02-13T09:27:49.206Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-02-13T09:27:49.206Z"' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`ipAddress` text,
	`userAgent` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`roleId` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`emailVerifiedAt` integer,
	`image` text,
	`createdAt` integer DEFAULT '"2025-02-13T09:27:49.206Z"' NOT NULL,
	`updatedAt` integer DEFAULT '"2025-02-13T09:27:49.206Z"' NOT NULL,
	FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verifyToken` (
	`email` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`token` text NOT NULL,
	`expiresAt` integer NOT NULL,
	FOREIGN KEY (`email`) REFERENCES `user`(`email`) ON UPDATE no action ON DELETE cascade
);
