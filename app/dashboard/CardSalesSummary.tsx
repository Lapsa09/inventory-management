"use client";

import { TrendingUp } from "lucide-react";
import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  salesData: MetricsDTO["saleSummary"];
};

function CardSalesSummary({ salesData }: Props) {
  const [timeframe, setTimeframe] = useState("weekly");

  const totalValueSum =
    salesData.reduce((acc, curr) => acc + +curr.totalValue, 0) || 0;

  const averageChangePercentage =
    salesData.reduce((acc, curr, _, array) => {
      return acc + +curr.changePercentage! / array.length;
    }, 0) || 0;

  const highestValueData = salesData.reduce((acc, curr) => {
    return acc.totalValue > curr.totalValue ? acc : curr;
  }, salesData[0] || {});

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

  const chartConfig = {
    totalValue: {
      label: "Desktop",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <Card className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      <CardHeader>
        <h2 className="text-lg font-semibold mb-2 px-7">Sales Summary</h2>
        <hr />
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-center mb-6 px-7 mt-5">
          <div className="text-lg font-medium">
            <p className="text-xs text-gray-400">Value</p>
            <span className="text-2xl font-extrabold">
              $
              {(totalValueSum / 1000000).toLocaleString("en", {
                maximumFractionDigits: 2,
              })}
              m
            </span>
            <span className="text-green-500 text-sm ml-2">
              <TrendingUp className="inline w-4 h-4 mr-1" />
              {averageChangePercentage.toFixed(2)}%
            </span>
          </div>
          <Select defaultValue="weekly">
            <SelectTrigger className="shadow-sm border border-gray-300 p-2 rounded max-w-40">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem defaultChecked value="weekly">
                Weekly
              </SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ChartContainer className="max-h-[350px]" config={chartConfig}>
          <BarChart data={salesData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis
              tickFormatter={(value) => {
                return `$${(value / 1000000).toFixed(0)}m`;
              }}
              tick={{ fontSize: 12, dx: -1 }}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
              }}
              content={
                <ChartTooltipContent
                  formatter={(value) => [
                    Intl.NumberFormat("en", {
                      currency: "USD",
                      style: "currency",
                    }).format(value as number),
                  ]}
                />
              }
            />
            <Bar
              dataKey="totalValue"
              fill="#3182ce"
              barSize={10}
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <hr />
          <div className="flex justify-between items-center mt-6 text-sm px-7">
            <p>{salesData.length || 0} days</p>
            <p className="text-sm">
              Highest Sales Date:{" "}
              <span className="font-bold">{highestValueDate}</span>
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CardSalesSummary;
