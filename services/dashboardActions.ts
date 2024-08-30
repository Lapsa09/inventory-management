"use server";

import { db } from "@/drizzle";
import {
  ExpenseByCategory,
  ExpenseSummary,
  Products,
  PurchaseSummary,
  SalesSummary,
} from "@/drizzle/schema";
import { desc, sql } from "drizzle-orm";

export async function getMetrics() {
  const popularProducts = await db
    .select()
    .from(Products)
    .orderBy(desc(Products.stockQuantity))
    .limit(15);

  const saleSummary = await db
    .select({
      totalValue: sql<number>`${SalesSummary.totalValue}`,
      changePercentage: SalesSummary.changePercentage,
      date: SalesSummary.date,
      salesSummaryId: SalesSummary.salesSummaryId,
    })
    .from(SalesSummary)
    .orderBy(desc(SalesSummary.date))
    .limit(5)
    .then((res) => res.toReversed());

  const purchaseSummary = await db
    .select()
    .from(PurchaseSummary)
    .orderBy(desc(PurchaseSummary.date))
    .limit(5)
    .then((res) => res.toReversed());
  const expenseSummary = await db
    .select()
    .from(ExpenseSummary)
    .orderBy(desc(ExpenseSummary.date))
    .limit(5);
  const expenseByCategorySummary = await db
    .select({
      amount: sql<string>`${ExpenseByCategory.amount}`,
      expenseSummaryId: ExpenseByCategory.expenseSummaryId,
      category: ExpenseByCategory.category,
      date: ExpenseByCategory.date,
      expenseByCategoryId: ExpenseByCategory.expenseByCategoryId,
    })
    .from(ExpenseByCategory);
  return {
    popularProducts,
    saleSummary,
    purchaseSummary,
    expenseSummary,
    expenseByCategorySummary,
  };
}
