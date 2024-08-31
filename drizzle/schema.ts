import {
  pgTable,
  text,
  varchar,
  numeric,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const Users = pgTable("users", {
  userId: varchar("user_id", { length: 255 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const Products = pgTable("products", {
  productId: varchar("product_id", { length: 255 }).primaryKey(),
  name: text("name").notNull(),
  price: numeric("price").notNull(),
  rating: numeric("rating"),
  stockQuantity: integer("stock_quantity").notNull(),
});

export const Sales = pgTable("sales", {
  saleId: varchar("sale_id", { length: 255 }).primaryKey(),
  productId: varchar("product_id", { length: 255 }).notNull(),
  timestamp: timestamp("timestamp", { mode: "string" }).notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price").notNull(),
  totalAmount: numeric("total_amount").notNull(),
});

export const Purchases = pgTable("purchases", {
  purchaseId: varchar("purchase_id", { length: 255 }).primaryKey(),
  productId: varchar("product_id", { length: 255 }).notNull(),
  timestamp: timestamp("timestamp", { mode: "string" }).notNull(),
  quantity: integer("quantity").notNull(),
  unitCost: numeric("unit_cost").notNull(),
  totalCost: numeric("total_cost").notNull(),
});

export const Expenses = pgTable("expenses", {
  expenseId: varchar("expense_id", { length: 255 }).primaryKey(),
  category: text("category").notNull(),
  amount: numeric("amount").notNull(),
  timestamp: timestamp("timestamp", { mode: "string" }).notNull(),
});

export const SalesSummary = pgTable("salesSummary", {
  salesSummaryId: varchar("sales_summary_id", { length: 255 }).primaryKey(),
  totalValue: numeric("total_value").notNull(),
  changePercentage: numeric("change_percentage"),
  date: timestamp("date", { mode: "string" }).notNull(),
});

export const PurchaseSummary = pgTable("purchaseSummary", {
  purchaseSummaryId: varchar("purchase_summary_id", {
    length: 255,
  }).primaryKey(),
  totalPurchased: numeric("totalPurchased").notNull(),
  changePercentage: numeric("change_percentage"),
  date: timestamp("date", { mode: "string" }).notNull(),
});

export const ExpenseSummary = pgTable("expenseSummary", {
  expenseSummaryId: varchar("expense_summary_id", { length: 255 }).primaryKey(),
  totalExpenses: numeric("total_expenses").notNull(),
  date: timestamp("date", { mode: "string" }).notNull(),
});

export const ExpenseByCategory = pgTable("expenseByCategory", {
  expenseByCategoryId: varchar("expense_by_category_id", {
    length: 255,
  }).primaryKey(),
  expenseSummaryId: varchar("expense_summary_id", { length: 255 }).notNull(),
  category: text("category").notNull(),
  amount: integer("amount").notNull(), // BigInt is used in Prisma but typically maps to integer in Drizzle
  date: timestamp("date", { mode: "string" }).notNull(),
});

// Relations
export const ProductsRelations = relations(Products, ({ many }) => ({
  sales: many(Sales),
  purchases: many(Purchases),
}));

export const SalesRelations = relations(Sales, ({ one }) => ({
  product: one(Products, {
    fields: [Sales.productId],
    references: [Products.productId],
  }),
}));

export const PurchasesRelations = relations(Purchases, ({ one }) => ({
  product: one(Products, {
    fields: [Purchases.productId],
    references: [Products.productId],
  }),
}));

export const ExpenseSummaryRelations = relations(
  ExpenseSummary,
  ({ many }) => ({
    expenseByCategory: many(ExpenseByCategory),
  })
);

export const ExpenseByCategoryRelations = relations(
  ExpenseByCategory,
  ({ one }) => ({
    expenseSummary: one(ExpenseSummary, {
      fields: [ExpenseByCategory.expenseSummaryId],
      references: [ExpenseSummary.expenseSummaryId],
    }),
  })
);
