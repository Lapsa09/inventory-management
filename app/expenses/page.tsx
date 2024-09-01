import Header from "@/components/Header";
import Filters from "./Filters";
import { SearchParams } from "@/types";
import Chart from "./Chart";
import { getter } from "@/services";
import { ExpensesByCategory } from "@/types/expenses";

const Expenses = async ({ searchParams }: { searchParams: SearchParams }) => {
  const expenses = await getter<ExpensesByCategory[]>({
    route: `/expenses${
      searchParams ? `?${new URLSearchParams(searchParams).toString()}` : ""
    }`,
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
