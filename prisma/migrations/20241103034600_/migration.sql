-- AlterTable for the Order table
ALTER TABLE "Order" 
ALTER COLUMN "products" SET NOT NULL,
ALTER COLUMN "products" SET DATA TYPE TEXT;

