/*
  Warnings:

  - The values [SINGLE] on the enum `ExpenseType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExpenseType_new" AS ENUM ('FIXED', 'INSTALLMENT');
ALTER TABLE "expenses" ALTER COLUMN "type" TYPE "ExpenseType_new" USING ("type"::text::"ExpenseType_new");
ALTER TYPE "ExpenseType" RENAME TO "ExpenseType_old";
ALTER TYPE "ExpenseType_new" RENAME TO "ExpenseType";
DROP TYPE "ExpenseType_old";
COMMIT;

-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "installmentNumber" INTEGER,
ADD COLUMN     "totalInstallments" INTEGER;
