
import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

interface GaugeChartProps {
  title: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ title, value, max, unit, color }) => {
  const percentage = (value / max) * 100;
  const data = [{ name: title, value: percentage }];

  return (
    <div className="flex flex-col items-center justify-between h-full">
      <h3 className="text-md font-semibold text-slate-600 text-center">{title}</h3>
      <div className="w-full h-32 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="90%"
            data={data}
            startAngle={180}
            endAngle={0}
            barSize={20}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: '#e9ecef' }}
              dataKey="value"
              cornerRadius={10}
              fill={color}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center top-4">
            <span className="text-3xl font-bold text-slate-800">{value.toFixed(1)}</span>
            <span className="text-sm text-slate-500">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
