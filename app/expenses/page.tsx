import Header from "@/components/Header";
import { getExpenses } from "@/services/expensesActions";
import Filters from "./Filters";
import { SearchParams } from "@/types";
import { z } from "zod";

import Chart from "./Chart";

const filtersSchema = z.object({
  category: z
    .enum(["All", "Office", "Professional", "Salaries"])
    .default("All"),
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
});

const Expenses = async ({ searchParams }: { searchParams: SearchParams }) => {
  const {
    category: selectedCategory,
    endDate,
    startDate,
  } = filtersSchema.parse(
    Object.fromEntries(new URLSearchParams(searchParams).entries())
  );

  const expenses = await getExpenses({
    category: selectedCategory,
    startDate,
    endDate,
  });
  return (
    <div>
      {/* HEADER */}
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Filters />
        {/* PIE CHART */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <Chart data={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
