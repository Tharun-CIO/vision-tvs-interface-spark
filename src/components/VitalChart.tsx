
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useState } from "react";

interface VitalData {
  time: string;
  heartRate: number;
  temperature: number;
  status: number;
  bloodGroup: number;
  activity: number;
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
  status: string;
  bloodGroup: string;
  activity: string;
}

const VitalChart = ({
  title,
  subtitle,
  heartRateData,
  temperatureData,
  heartRateLatest,
  temperatureLatest,
  status,
  bloodGroup,
  activity
}: VitalChartProps) => {
  const [selectedVital, setSelectedVital] = useState<'heartRate' | 'temperature' | 'status' | 'bloodGroup' | 'activity'>('heartRate');

  // Generate mock data for status, bloodGroup, and activity over time
  const statusData = heartRateData.map((item, index) => ({
    time: item.time,
    value: status === 'normal' ? 1 : status === 'warning' ? 2 : 3
  }));

  const bloodGroupData = heartRateData.map((item, index) => ({
    time: item.time,
    value: bloodGroup === 'O+' ? 1 : bloodGroup === 'A-' ? 2 : bloodGroup === 'B+' ? 3 : 4
  }));

  const activityData = heartRateData.map((item, index) => ({
    time: item.time,
    value: activity === 'Active' ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 20) + 30
  }));

  // Combine the data
  const combinedData: VitalData[] = heartRateData.map((hrItem, index) => ({
    time: hrItem.time,
    heartRate: hrItem.value,
    temperature: temperatureData[index]?.value || 0,
    status: statusData[index]?.value || 1,
    bloodGroup: bloodGroupData[index]?.value || 1,
    activity: activityData[index]?.value || 50
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
      value: 'status', 
      label: 'Status', 
      color: '#10b981', 
      unit: '', 
      normalRange: 'Normal', 
      latest: status,
      type: 'bar'
    },
    { 
      value: 'bloodGroup', 
      label: 'Blood Group', 
      color: '#f59e0b', 
      unit: '', 
      normalRange: 'Type', 
      latest: bloodGroup,
      type: 'bar'
    },
    { 
      value: 'activity', 
      label: 'Activity Level', 
      color: '#8b5cf6', 
      unit: '%', 
      normalRange: '60-100%', 
      latest: activity,
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
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <p className="text-gray-600 text-xs">{subtitle}</p>
          <Select value={selectedVital} onValueChange={(value: 'heartRate' | 'temperature' | 'status' | 'bloodGroup' | 'activity') => setSelectedVital(value)}>
            <SelectTrigger className="w-48 h-7 text-xs bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
              {vitalOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-xs">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: option.color }}
                    ></div>
                    <span>{option.label}</span>
                  </div>
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
          {currentVital.type === 'line' ? (
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
          ) : (
            <BarChart data={combinedData} margin={{
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
              <Bar 
                dataKey={selectedVital} 
                fill={currentVital.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default VitalChart;
