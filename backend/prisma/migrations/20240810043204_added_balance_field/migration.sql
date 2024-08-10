/*
  Warnings:

  - Added the required column `balanceAdjustment` to the `UserMembership` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentAmount` to the `UserMembership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserMembership" ADD COLUMN     "balanceAdjustment" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paymentAmount" DOUBLE PRECISION NOT NULL;
