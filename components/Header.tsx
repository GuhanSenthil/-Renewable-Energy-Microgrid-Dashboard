
import React from 'react';
import type { StatusData } from '../types';

interface HeaderProps {
  status: StatusData;
  lastUpdate: string;
}

const statusStyles = {
  optimal: { dot: 'bg-green-500', text: 'text-green-600', label: 'Optimal' },
  warning: { dot: 'bg-yellow-500', text: 'text-yellow-600', label: 'Warning' },
  critical: { dot: 'bg-red-500', text: 'text-red-600', label: 'Critical' },
};

const Header: React.FC<HeaderProps> = ({ status, lastUpdate }) => {
  const currentStatus = statusStyles[status.system_health] || statusStyles.optimal;
  const formattedTime = new Date(lastUpdate).toLocaleTimeString();

  return (
    <header className="bg-white shadow-sm rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center">
        <div className={`w-4 h-4 rounded-full mr-3 ${currentStatus.dot}`}></div>
        <h2 className="text-lg font-semibold text-slate-700">
          System Status: <span className={currentStatus.text}>{currentStatus.label}</span>
        </h2>
      </div>
      <div className="flex items-center gap-4 sm:gap-6 text-sm text-slate-500">
        <span>Uptime: <span className="font-medium text-slate-700">{status.uptime_hours.toFixed(2)} hours</span></span>
        <span>Last Update: <span className="font-medium text-slate-700">{formattedTime}</span></span>
      </div>
    </header>
  );
};

export default Header;
