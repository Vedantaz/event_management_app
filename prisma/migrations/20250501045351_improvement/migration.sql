-- DropForeignKey
ALTER TABLE `attendee` DROP FOREIGN KEY `Attendee_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `attendee` DROP FOREIGN KEY `Attendee_userId_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cancellation` DROP FOREIGN KEY `Cancellation_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `cancellation` DROP FOREIGN KEY `Cancellation_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `cancellation` DROP FOREIGN KEY `Cancellation_userId_fkey`;

-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_userId_fkey`;

-- DropIndex
DROP INDEX `Attendee_eventId_fkey` ON `attendee`;

-- DropIndex
DROP INDEX `Attendee_userId_fkey` ON `attendee`;

-- DropIndex
DROP INDEX `Booking_eventId_fkey` ON `booking`;

-- DropIndex
DROP INDEX `Cancellation_bookingId_fkey` ON `cancellation`;

-- DropIndex
DROP INDEX `Cancellation_eventId_fkey` ON `cancellation`;

-- DropIndex
DROP INDEX `Cancellation_userId_fkey` ON `cancellation`;

-- DropIndex
DROP INDEX `Event_userId_fkey` ON `event`;

-- AlterTable
ALTER TABLE `booking` MODIFY `status` ENUM('PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED') NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendee` ADD CONSTRAINT `Attendee_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendee` ADD CONSTRAINT `Attendee_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cancellation` ADD CONSTRAINT `Cancellation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cancellation` ADD CONSTRAINT `Cancellation_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cancellation` ADD CONSTRAINT `Cancellation_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
