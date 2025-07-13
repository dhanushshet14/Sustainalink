'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Recycle } from 'lucide-react';

const chartData = [
  { month: 'January', recycled: 186, landfill: 80 },
  { month: 'February', recycled: 305, landfill: 200 },
  { month: 'March', recycled: 237, landfill: 120 },
  { month: 'April', recycled: 250, landfill: 190 },
  { month: 'May', recycled: 200, landfill: 130 },
  { month: 'June', recycled: 310, landfill: 140 },
];

const chartConfig = {
  recycled: {
    label: 'Recycled (kg)',
    color: 'hsl(var(--chart-2))',
  },
  landfill: {
    label: 'Landfill (kg)',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function WasteTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Recycle className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Waste Trends</CardTitle>
        </div>
        <CardDescription>Recycled vs. Landfill Waste (Last 6 Months)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="recycled" fill="var(--color-recycled)" radius={4} />
            <Bar dataKey="landfill" fill="var(--color-landfill)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
