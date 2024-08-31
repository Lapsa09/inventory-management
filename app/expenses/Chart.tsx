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
const colors = {
  Office: "#00C49F",
  Salaries: "#0088FE",
  Professional: "#FFBB28",
};

type AggregatedDataItem = {
  name: string;
  fill?: string;
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
    data.reduce((acc: AggregatedData, data, i) => {
      const amount = data.amount;

      acc[data.category] ??= {
        name: data.category,
        amount: 0,
        fill: colors[data.category as keyof typeof colors],
      };

      acc[data.category].amount += amount;
      return acc;
    }, {})
  );

  const chartConfig = {
    Office: {
      label: "Office",
      color: colors.Office,
    },
    Professional: {
      label: "Professional",
      color: colors.Professional,
    },
    Salaries: {
      label: "Salaries",
      color: colors.Salaries,
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="w-full max-h-96 aspect-square"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent className="w-52" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie data={aggregatedData} nameKey="name" dataKey="amount" />
      </PieChart>
    </ChartContainer>
  );
}

export default Chart;
