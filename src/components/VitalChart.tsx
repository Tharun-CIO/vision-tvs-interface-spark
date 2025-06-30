
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useState } from "react";

interface VitalData {
  time: string;
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
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
  respiratoryRateData: Array<{
    time: string;
    value: number;
  }>;
  heartRateLatest: string;
  temperatureLatest: string;
  respiratoryRateLatest: string;
  status: string;
  bloodGroup: string;
  activity: string;
}

const VitalChart = ({
  title,
  subtitle,
  heartRateData,
  temperatureData,
  respiratoryRateData,
  heartRateLatest,
  temperatureLatest,
  respiratoryRateLatest,
  status,
  bloodGroup,
  activity
}: VitalChartProps) => {
  const [selectedVital, setSelectedVital] = useState<'heartRate' | 'temperature' | 'respiratoryRate'>('heartRate');

  // Combine the data
  const combinedData: VitalData[] = heartRateData.map((hrItem, index) => ({
    time: hrItem.time,
    heartRate: hrItem.value,
    temperature: temperatureData[index]?.value || 0,
    respiratoryRate: respiratoryRateData[index]?.value || 0
  }));

  const vitalOptions = [
    { 
      value: 'heartRate', 
      label: 'Heart Rate', 
      color: '#ef4444', 
      unit: 'bpm', 
      normalRange: '60-100 bpm', 
      latest: heartRateLatest,
      type: 'line'
    },
    { 
      value: 'temperature', 
      label: 'Temperature', 
      color: '#3b82f6', 
      unit: '°F', 
      normalRange: '97-99°F', 
      latest: temperatureLatest,
      type: 'line'
    },
    { 
      value: 'respiratoryRate', 
      label: 'Respiratory Rate', 
      color: '#06b6d4', 
      unit: 'bpm', 
      normalRange: '12-20 bpm', 
      latest: respiratoryRateLatest,
      type: 'line'
    }
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-6">
          <p className="text-gray-600 text-sm font-medium">{subtitle}</p>
          <Select value={selectedVital} onValueChange={(value: 'heartRate' | 'temperature' | 'respiratoryRate') => setSelectedVital(value)}>
            <SelectTrigger className="w-56 h-10 text-sm bg-white/70 backdrop-blur-sm border-gray-200/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl z-50 rounded-2xl">
              {vitalOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-sm cursor-pointer hover:bg-gray-50/80 rounded-xl m-1 transition-all duration-200">
                  <div className="flex items-center space-x-3 py-1">
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm" 
                      style={{ backgroundColor: option.color }}
                    ></div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-right bg-gray-50/50 px-4 py-2 rounded-2xl">
          <p className="text-gray-700 text-sm font-semibold">Latest: {currentVital.latest}</p>
          <p className="text-gray-500 text-xs font-medium">Normal: {currentVital.normalRange}</p>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData} margin={{
            top: 10,
            right: 40,
            left: 30,
            bottom: 10
          }}>
            <XAxis 
              dataKey="time" 
              tick={{
                fill: '#6b7280',
                fontSize: 12,
                fontWeight: 500
              }} 
              axisLine={{
                stroke: '#d1d5db',
                strokeWidth: 1
              }} 
              tickLine={{
                stroke: '#d1d5db'
              }} 
            />
            <YAxis 
              tick={{
                fill: '#6b7280',
                fontSize: 12,
                fontWeight: 500
              }} 
              axisLine={{
                stroke: '#d1d5db',
                strokeWidth: 1
              }} 
              tickLine={{
                stroke: '#d1d5db'
              }} 
            />
            <ChartTooltip 
              content={<ChartTooltipContent />} 
              labelStyle={{
                color: '#6b7280',
                fontWeight: 600
              }} 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey={selectedVital} 
              stroke={currentVital.color} 
              strokeWidth={3} 
              dot={{
                fill: currentVital.color,
                strokeWidth: 2,
                r: 4,
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
              }} 
              activeDot={{
                r: 6,
                stroke: currentVital.color,
                strokeWidth: 3,
                fill: 'white',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))'
              }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default VitalChart;
