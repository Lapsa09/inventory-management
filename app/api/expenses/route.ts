import { db } from "@/drizzle";
import { ExpenseByCategory } from "@/drizzle/schema";
import { and, eq, gte, lte, sql, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const filtersSchema = z.object({
  category: z
    .enum(["All", "Office", "Professional", "Salaries"])
    .default("All"),
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
});

export async function GET(req: NextRequest) {
  const { endDate, startDate } = filtersSchema.parse(
    Object.fromEntries(req.nextUrl.searchParams.entries())
  );
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
  ];

  const expenses = await db.query.ExpenseByCategory.findMany({
    where: and(...expressions),
  });

  return NextResponse.json(expenses);
}
