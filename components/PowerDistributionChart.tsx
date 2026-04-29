
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PowerDistributionChartProps {
  data: {
    solar: number;
    load: number;
    battery: number;
  };
}

const COLORS = {
  solar: '#f1c40f',
  load: '#3498db',
  battery: '#e74c3c'
};

const PowerDistributionChart: React.FC<PowerDistributionChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Solar Generation', value: Math.max(0, data.solar) },
    { name: 'Load Consumption', value: Math.max(0, data.load) },
  ];

  return (
    <div className="flex flex-col items-center h-full">
      <h3 className="text-md font-semibold text-slate-600 text-center mb-2">Power Distribution</h3>
      <div className="w-full h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={60}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              paddingAngle={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name.split(' ')[0].toLowerCase() as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value.toFixed(0)} W`}/>
            <Legend iconSize={10} verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PowerDistributionChart;
