import {
  Products,
  SalesSummary,
  PurchaseSummary,
  ExpenseSummary,
  ExpenseByCategory,
} from "@/drizzle/schema";

export type MetricsDTO = {
  popularProducts: (typeof Products.$inferSelect)[];
  saleSummary: (typeof SalesSummary.$inferSelect)[];
  purchaseSummary: (typeof PurchaseSummary.$inferSelect)[];
  expenseSummary: (typeof ExpenseSummary.$inferSelect)[];
  expenseByCategorySummary: (typeof ExpenseByCategory.$inferSelect)[];
};
