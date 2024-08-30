import { getExpenses } from "@/services/expensesActions";

export type ExpensesByCategory = Awaited<ReturnType<typeof getExpenses>>[0];
