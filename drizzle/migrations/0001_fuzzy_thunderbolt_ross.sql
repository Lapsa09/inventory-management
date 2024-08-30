CREATE TABLE IF NOT EXISTS "expenseByCategory" (
	"expense_by_category_id" varchar(255) PRIMARY KEY NOT NULL,
	"expense_summary_id" varchar(255) NOT NULL,
	"category" text NOT NULL,
	"amount" integer NOT NULL,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "expenseSummary" (
	"expense_summary_id" varchar(255) PRIMARY KEY NOT NULL,
	"total_expenses" numeric NOT NULL,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "purchaseSummary" (
	"purchase_summary_id" varchar(255) PRIMARY KEY NOT NULL,
	"totalPurchased" numeric NOT NULL,
	"change_percentage" numeric,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "salesSummary" (
	"sales_summary_id" varchar(255) PRIMARY KEY NOT NULL,
	"total_value" numeric NOT NULL,
	"change_percentage" numeric,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
DROP TABLE "expense_by_category";--> statement-breakpoint
DROP TABLE "expense_summary";--> statement-breakpoint
DROP TABLE "purchase_summary";--> statement-breakpoint
DROP TABLE "sales_summary";