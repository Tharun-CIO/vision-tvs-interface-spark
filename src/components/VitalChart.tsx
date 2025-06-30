
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useState } from "react";

interface VitalData {
  time: string;
  heartRate: number;
  temperature: number;
}

interface VitalChartProps {
  title: string;
  subtitle: string;
  heartRateData: Array<{
    time: string;
    value: number;
  }>;
  temperatureData: Array<{
    time: string;
    value: number;
  }>;
  heartRateLatest: string;
  temperatureLatest: string;
}

const VitalChart = ({
  title,
  subtitle,
  heartRateData,
  temperatureData,
  heartRateLatest,
  temperatureLatest
}: VitalChartProps) => {
  const [selectedVital, setSelectedVital] = useState<'heartRate' | 'temperature'>('heartRate');

  // Combine the data
  const combinedData: VitalData[] = heartRateData.map((hrItem, index) => ({
    time: hrItem.time,
    heartRate: hrItem.value,
    temperature: temperatureData[index]?.value || 0
  }));

  const vitalOptions = [
    { value: 'heartRate', label: 'Heart Rate', color: '#ef4444', unit: 'bpm', normalRange: '60-100 bpm', latest: heartRateLatest },
    { value: 'temperature', label: 'Temperature', color: '#3b82f6', unit: '°F', normalRange: '97-99°F', latest: temperatureLatest }
  ];

  const currentVital = vitalOptions.find(v => v.value === selectedVital)!;

  const chartConfig = {
    [selectedVital]: {
      label: currentVital.unit,
      color: currentVital.color
    }
  };

  return (
    <div className="h-full w-full my-0 mx-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <p className="text-gray-600 text-xs">{subtitle}</p>
          <Select value={selectedVital} onValueChange={(value: 'heartRate' | 'temperature') => setSelectedVital(value)}>
            <SelectTrigger className="w-40 h-7 text-xs bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg">
              {vitalOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-xs">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-right">
          <p className="text-gray-600 text-xs">Latest: {currentVital.latest}</p>
          <p className="text-gray-500 text-xs">Normal: {currentVital.normalRange}</p>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
            <XAxis 
              dataKey="time" 
              tick={{
                fill: '#6b7280',
                fontSize: 10
              }} 
              axisLine={{
                stroke: '#d1d5db'
              }} 
              tickLine={{
                stroke: '#d1d5db'
              }} 
            />
            <YAxis 
              tick={{
                fill: '#6b7280',
                fontSize: 10
              }} 
              axisLine={{
                stroke: '#d1d5db'
              }} 
              tickLine={{
                stroke: '#d1d5db'
              }} 
            />
            <ChartTooltip 
              content={<ChartTooltipContent />} 
              labelStyle={{
                color: '#6b7280'
              }} 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '8px'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey={selectedVital} 
              stroke={currentVital.color} 
              strokeWidth={2} 
              dot={{
                fill: currentVital.color,
                strokeWidth: 2,
                r: 3
              }} 
              activeDot={{
                r: 4,
                stroke: currentVital.color,
                strokeWidth: 2
              }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default VitalChart;
