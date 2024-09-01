import { ExpenseByCategory } from "@/drizzle/schema";

export type ExpensesByCategory = typeof ExpenseByCategory.$inferSelect;
