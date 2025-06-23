
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface VitalChartProps {
  title: string;
  subtitle: string;
  data: Array<{ time: string; value: number }>;
  normalRange: string;
  latest: string;
  color: string;
  unit: string;
}

const VitalChart = ({ title, subtitle, data, normalRange, latest, color, unit }: VitalChartProps) => {
  const chartConfig = {
    value: {
      label: unit,
      color: color,
    },
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-gray-600 text-xs">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600 text-xs">Latest: {latest}</p>
          <p className="text-gray-500 text-xs">Normal: {normalRange}</p>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="time" 
              tick={{ fill: '#6b7280', fontSize: 10 }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 10 }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              labelStyle={{ color: '#6b7280' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 3 }}
              activeDot={{ r: 4, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default VitalChart;
