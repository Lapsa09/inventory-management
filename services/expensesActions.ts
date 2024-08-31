"use server";
import { db } from "@/drizzle";
import { ExpenseByCategory } from "@/drizzle/schema";
import { and, eq, gte, lte, sql, SQL } from "drizzle-orm";

export const getExpenses = async ({
  category,
  startDate,
  endDate,
}: {
  category?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const expressions: (SQL<unknown> | undefined)[] = [
    !!startDate || !!endDate
      ? and(
          !!startDate
            ? gte(
                ExpenseByCategory.date,
                sql<Date>`to_date(${startDate}, 'yyyy-mm-dd')`
              )
            : undefined,
          !!endDate
            ? lte(
                ExpenseByCategory.date,
                sql<Date>`to_date(${endDate}, 'yyyy-mm-dd')`
              )
            : undefined
        )
      : undefined,
    category && category !== "All"
      ? eq(ExpenseByCategory.category, category)
      : undefined,
  ];

  const products = await db.query.ExpenseByCategory.findMany({
    where: and(...expressions),
  });

  return products;
};
