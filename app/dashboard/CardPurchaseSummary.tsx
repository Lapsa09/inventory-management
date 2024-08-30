"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { MetricsDTO } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  purchaseData: MetricsDTO["purchaseSummary"];
};

const chartConfig = {
  totalPurchased: {
    label: "Total Purchased",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function CardPurchaseSummary({ purchaseData }: Props) {
  const lastDataPoint = purchaseData.at(-1) || null;
  return (
    <Card className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold mb-2 px-7">
          Purchase Summary
        </CardTitle>
        <hr />
      </CardHeader>
      <CardContent>
        <div className="mb-4 px-7">
          <p className="text-xs text-gray-400">Purchase</p>
          <div className="flex items-center">
            <p className="text-2xl font-bold">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(lastDataPoint ? +lastDataPoint.totalPurchased : 0)}
            </p>
            {lastDataPoint && (
              <p
                className={`text-sm ${
                  +lastDataPoint.changePercentage! >= 0
                    ? "text-green-500"
                    : "text-red-500"
                } flex ml-3`}
              >
                {+lastDataPoint.changePercentage! >= 0 ? (
                  <TrendingUp className=" w-5 h-5 mr-1" />
                ) : (
                  <TrendingDown className=" w-5 h-5 mr-1" />
                )}
                {Math.abs(+lastDataPoint.changePercentage!).toFixed(2)}%
              </p>
            )}
          </div>
        </div>
        <ChartContainer
          className="w-full sm:max-h-[280px] md:max-h-[250px] lg:max-h-[250px] xl:max-h-[170px]"
          config={chartConfig}
        >
          <AreaChart
            data={purchaseData}
            accessibilityLayer
            margin={{ top: 0, right: 10, left: -50, bottom: 45 }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis tickLine={false} tick={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => [
                    Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(value as number),
                  ]}
                />
              }
            />
            <Area type="linear" dataKey="totalPurchased" dot={true} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default CardPurchaseSummary;
