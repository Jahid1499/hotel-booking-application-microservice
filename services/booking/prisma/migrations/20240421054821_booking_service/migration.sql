-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
