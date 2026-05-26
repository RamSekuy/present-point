/*
  Warnings:

  - You are about to drop the column `isConfirmed` on the `Cuty` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Cuty` DROP COLUMN `isConfirmed`,
    ADD COLUMN `status` ENUM('Pending', 'Confirmed', 'Rejected') NOT NULL DEFAULT 'Pending';
