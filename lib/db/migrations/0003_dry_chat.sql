CREATE INDEX `gameSaveIdx_idx` ON `pokemon` (`gameSaveId`);--> statement-breakpoint
CREATE INDEX `boxSlotIdx_idx` ON `pokemon` (`gameSaveId`,`box`,`boxSlot`);