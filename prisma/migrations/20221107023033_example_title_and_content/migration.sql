/*
  Warnings:

  - Added the required column `content` to the `Example` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Example` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Example` ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
