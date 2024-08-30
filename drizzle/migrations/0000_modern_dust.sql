CREATE TABLE IF NOT EXISTS "expense_by_category" (
	"expense_by_category_id" varchar(255) PRIMARY KEY NOT NULL,
	"expense_summary_id" varchar(255) NOT NULL,
	"category" text NOT NULL,
	"amount" integer NOT NULL,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "expense_summary" (
	"expense_summary_id" varchar(255) PRIMARY KEY NOT NULL,
	"total_expenses" numeric NOT NULL,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "expenses" (
	"expense_id" varchar(255) PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"amount" numeric NOT NULL,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"product_id" varchar(255) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" numeric NOT NULL,
	"rating" numeric,
	"stock_quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "purchase_summary" (
	"purchase_summary_id" varchar(255) PRIMARY KEY NOT NULL,
	"total_purchased" numeric NOT NULL,
	"change_percentage" numeric,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "purchases" (
	"purchase_id" varchar(255) PRIMARY KEY NOT NULL,
	"product_id" varchar(255) NOT NULL,
	"timestamp" timestamp NOT NULL,
	"quantity" integer NOT NULL,
	"unit_cost" numeric NOT NULL,
	"total_cost" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sales" (
	"sale_id" varchar(255) PRIMARY KEY NOT NULL,
	"product_id" varchar(255) NOT NULL,
	"timestamp" timestamp NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" numeric NOT NULL,
	"total_amount" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sales_summary" (
	"sales_summary_id" varchar(255) PRIMARY KEY NOT NULL,
	"total_value" numeric NOT NULL,
	"change_percentage" numeric,
	"date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" varchar(255) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL
);
