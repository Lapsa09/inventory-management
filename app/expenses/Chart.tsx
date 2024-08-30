"use client";

import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import { ExpensesByCategory } from "@/types/expenses";

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem;
};
type Props = {
  data: ExpensesByCategory[];
};

function Chart({ data }: Props) {
  const aggregatedData: AggregatedDataItem[] = Object.values(
    data.reduce((acc: AggregatedData, data) => {
      const amount = data.amount;

      acc[data.category] ??= {
        name: data.category,
        amount: 0,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      };

      acc[data.category].amount += amount;
      return acc;
    }, {})
  );

  const chartConfig = {
    Office: {
      label: "Office",
      color: aggregatedData.find((item) => item.name === "Office")?.color!,
    },
    Professional: {
      label: "Professional",
      color: aggregatedData.find((item) => item.name === "Professional")
        ?.color!,
    },
    Salaries: {
      label: "Salaries",
      color: aggregatedData.find((item) => item.name === "Salaries")?.color!,
    },
    All: {
      label: "All",
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="w-full aspect-square">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel className="w-52" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie data={aggregatedData} nameKey="category" dataKey="amount"></Pie>
      </PieChart>
    </ChartContainer>
  );
}

export default Chart;
