ALTER TABLE "Users" DROP CONSTRAINT IF EXISTS "Users_fk0";

ALTER TABLE "Accounts" DROP CONSTRAINT IF EXISTS "Accounts_fk0";

ALTER TABLE "Transaction" DROP CONSTRAINT IF EXISTS "Transaction_fk0";

ALTER TABLE "Transaction" DROP CONSTRAINT IF EXISTS "Transaction_fk1";

ALTER TABLE "Transaction" DROP CONSTRAINT IF EXISTS "Transaction_fk2";

ALTER TABLE "ref_Expense_Categories" DROP CONSTRAINT IF EXISTS "ref_Expense_Categories_fk0";

DROP TABLE IF EXISTS "Users";

DROP TABLE IF EXISTS "Account_Types";

DROP TABLE IF EXISTS "Accounts";

DROP TABLE IF EXISTS "Transaction";

DROP TABLE IF EXISTS "Transaction_Types";

DROP TABLE IF EXISTS "ref_Expense_Categories";

