
import React from 'react';
import { DashboardIcon, PowerIcon, ZoneIcon, HistoryIcon, SettingsIcon } from './icons';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <a href="#" className={`flex items-center p-3 my-1 rounded-lg transition-colors ${active ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
    {icon}
    <span className="ml-4 font-medium">{label}</span>
  </a>
);

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-800 text-white p-4 flex-col hidden lg:flex">
      <div className="flex items-center mb-8">
        <PowerIcon className="h-10 w-10 text-green-400" />
        <h1 className="text-xl font-bold ml-2">Microgrid</h1>
      </div>
      <nav className="flex-1">
        <NavItem icon={<DashboardIcon className="h-6 w-6" />} label="Dashboard" active />
        <NavItem icon={<PowerIcon className="h-6 w-6" />} label="Power Flow" />
        <NavItem icon={<ZoneIcon className="h-6 w-6" />} label="Zone Management" />
        <NavItem icon={<HistoryIcon className="h-6 w-6" />} label="Historical Data" />
        <NavItem icon={<SettingsIcon className="h-6 w-6" />} label="System Settings" />
      </nav>
      <div className="mt-auto">
        <p className="text-xs text-slate-400 text-center">© 2024 Microgrid Systems</p>
      </div>
    </aside>
  );
};

export default Sidebar;
