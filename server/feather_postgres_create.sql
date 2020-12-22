CREATE TABLE "Users" (
	"_id" serial NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"birth_date" DATE NOT NULL,
	"email" varchar NOT NULL UNIQUE,
	"user_name" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	"registration_date" DATE NOT NULL,
	"Accounts_id" int NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Account_Types" (
	"_id" serial NOT NULL,
	"type" varchar NOT NULL,
	"description" varchar NOT NULL,
	"rate" float,
	CONSTRAINT "Account_Types_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Accounts" (
	"_id" serial NOT NULL,
	"type" varchar NOT NULL,
	"description" varchar NOT NULL,
	"balance" float NOT NULL,
	"Account_Types_id" int NOT NULL,
	CONSTRAINT "Accounts_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Transaction" (
	"_id" serial NOT NULL,
	"created_date" DATE NOT NULL,
	"transaction_date" DATE NOT NULL,
	"amount" float NOT NULL,
	"frequency" varchar NOT NULL,
	"category_id" int NOT NULL,
	"Transaction_Types_id" int NOT NULL,
	"Account_id" int NOT NULL,
	"balance" int NOT NULL,
	CONSTRAINT "Transaction_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Transaction_Types" (
	"_id" serial NOT NULL,
	"type" serial NOT NULL,
	"description" serial NOT NULL,
	CONSTRAINT "Transaction_Types_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "ref_Expense_Categories" (
	"_id" serial NOT NULL,
	"parent_id" int NOT NULL,
	"description" varchar NOT NULL,
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

INSERT INTO "Users" VALUES (0, 'Geo', 'Alarcon', '1992-12-14', 'test@gmail.com', 'UserName', 'password', '2020-12-19', 0);