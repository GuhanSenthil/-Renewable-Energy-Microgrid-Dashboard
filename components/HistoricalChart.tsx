
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HistoryDataPoint } from '../types';

interface HistoricalChartProps {
  data: HistoryDataPoint[];
}

const HistoricalChart: React.FC<HistoricalChartProps> = ({ data }) => {
  return (
    <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
            data={data}
            margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
            <YAxis yAxisId="left" stroke="#f1c40f" fontSize={12} label={{ value: 'Power (W)', angle: -90, position: 'insideLeft', fill: '#64748b' }}/>
            <YAxis yAxisId="right" orientation="right" stroke="#2ecc71" fontSize={12} label={{ value: 'Battery (%)', angle: -90, position: 'insideRight', fill: '#64748b' }}/>
            <Tooltip
                contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(2px)',
                    border: '1px solid #ccc',
                    borderRadius: '8px'
                }}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="solar_power" name="Solar Power" stroke="#f1c40f" strokeWidth={2} dot={false} />
            <Line yAxisId="left" type="monotone" dataKey="load_power" name="Load Power" stroke="#3498db" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="battery_level" name="Battery Level" stroke="#2ecc71" strokeWidth={2} dot={false} />
        </LineChart>
        </ResponsiveContainer>
    </div>
  );
};

export default HistoricalChart;
