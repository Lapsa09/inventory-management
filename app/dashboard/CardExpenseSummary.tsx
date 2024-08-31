"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MetricsDTO } from "@/types/dashboard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useMediaQuery } from "usehooks-ts";
import dynamic from "next/dynamic";

type Props = {
  expenseSummary: MetricsDTO["expenseSummary"];
  expenseByCategorySummary: MetricsDTO["expenseByCategorySummary"];
};

type ExpenseSums = {
  [category: string]: number;
};

const colors = ["#00C49F", "#0088FE", "#FFBB28"];

function CardExpenseSummary(props: Props) {
  const expenseSummary = props.expenseSummary[0];
  const matches = useMediaQuery("(min-width: 1280px)", {
    initializeWithValue: false,
    defaultValue: true,
  });
  const expenseByCategorySummary = props.expenseByCategorySummary || [];

  const expenseSums = expenseByCategorySummary.reduce<ExpenseSums>(
    (acc, item) => {
      const category = item.category + " Expenses";
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value], i) => ({
      name,
      value,
      fill: colors[i],
    })
  );

  const totalExpenses = expenseCategories.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0
  );

  const chartConfig = Object.keys(expenseSums).reduce<ChartConfig>(
    (acc, category, index) => {
      acc[category] = {
        label: category,
        color: colors[index],
      };
      return acc;
    },
    {}
  );

  return (
    <Card className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      <CardHeader className="pb-0">
        <h2 className="text-lg font-semibold mb-2 px-7">Expense Summary</h2>
        <hr />
      </CardHeader>
      {/* BODY */}
      <CardContent className="xl:flex justify-between pr-7 flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="w-full aspect-square xl:max-h-[140px] max-h-[400px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="w-52" />}
            />
            <ChartLegend
              align={matches ? "right" : "center"}
              verticalAlign={matches ? "middle" : "bottom"}
              layout={matches ? "vertical" : "horizontal"}
              content={<ChartLegendContent />}
            />
            <Pie
              data={expenseCategories}
              dataKey="value"
              nameKey="name"
              innerRadius="60%"
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl xl:text-sm font-bold"
                        >
                          ${totalExpenses.toFixed(2)}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* FOOTER */}
      <CardFooter className="pt-0">
        <div className="w-full">
          <hr />
          {expenseSummary && (
            <div className="mt-2 flex justify-between items-center px-7">
              <div className="pt-2">
                <p className="text-sm">
                  Average:{" "}
                  <span className="font-semibold">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(+expenseSummary.totalExpenses)}
                  </span>
                </p>
              </div>
              <span className="flex items-center mt-2">
                <TrendingUp className="mr-2 text-green-500" />
                30%
              </span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default CardExpenseSummary;
