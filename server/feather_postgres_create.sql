CREATE TABLE "Users" (
	"_id" serial NOT NULL,
	"first_name" varchar(40) NOT NULL,
	"last_name" varchar(40) NOT NULL,
	"birth_date" DATE NOT NULL,
	"email" varchar(40) NOT NULL,
	"login" varchar(40) NOT NULL,
	"password" varchar(40) NOT NULL,
	"registration_date" DATE NOT NULL,
	"Accounts_id" int NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Account_Types" (
	"_id" serial NOT NULL,
	"type" varchar(20) NOT NULL,
	"description" varchar(40) NOT NULL,
	"rate" float,
	CONSTRAINT "Account_Types_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Accounts" (
	"_id" serial NOT NULL,
	"type" varchar(40) NOT NULL,
	"description" varchar(40) NOT NULL,
	"balance" int NOT NULL,
	"Account_Types_id" int NOT NULL,
	CONSTRAINT "Accounts_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Transaction" (
	"_id" varchar(20) NOT NULL,
	"created_date" DATE NOT NULL,
	"transaction_date" DATE NOT NULL,
	"amount" float NOT NULL,
	"frequency" varchar(20) NOT NULL,
	"category_id" int NOT NULL,
	"Transaction_Types_id" int NOT NULL,
	"Account_id" int NOT NULL,
	"balance" bigint NOT NULL,
	CONSTRAINT "Transaction_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Transaction_Types" (
	"_id" serial NOT NULL,
	"type" varchar(20) NOT NULL,
	"description" varchar(40) NOT NULL,
	CONSTRAINT "Transaction_Types_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ref_Expense_Categories" (
	"_id" serial NOT NULL,
	"parent_id" int NOT NULL,
	"description" varchar(40) NOT NULL,
	CONSTRAINT "ref_Expense_Categories_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Users" ADD CONSTRAINT "Users_fk0" FOREIGN KEY ("Accounts_id") REFERENCES "Accounts"("_id");


ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_fk0" FOREIGN KEY ("Account_Types_id") REFERENCES "Account_Types"("_id");

ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_fk0" FOREIGN KEY ("category_id") REFERENCES "ref_Expense_Categories"("_id");
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_fk1" FOREIGN KEY ("Transaction_Types_id") REFERENCES "Transaction_Types"("_id");
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_fk2" FOREIGN KEY ("Account_id") REFERENCES "Accounts"("_id");


ALTER TABLE "ref_Expense_Categories" ADD CONSTRAINT "ref_Expense_Categories_fk0" FOREIGN KEY ("parent_id") REFERENCES "ref_Expense_Categories"("_id");

INSERT INTO "Account_Types" VALUES (0, 'Checking', 'Test Bank', NULL);
INSERT INTO "Accounts" VALUES (0, 'Checking', 'Test Bank', 0, 0);