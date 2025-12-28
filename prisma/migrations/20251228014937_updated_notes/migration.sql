/*
  Warnings:

  - You are about to drop the column `Content` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "Content",
ADD COLUMN     "content" TEXT;
