/*
  Warnings:

  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "options" JSONB[];

-- DropTable
DROP TABLE "Option";
