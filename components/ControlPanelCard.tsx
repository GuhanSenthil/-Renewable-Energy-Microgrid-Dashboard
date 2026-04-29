
import React from 'react';
import type { ControlData } from '../types';
import Card from './Card';
import { SettingsIcon } from './icons';

interface ControlPanelCardProps {
  control: ControlData;
  onControlChange: (controlKey: keyof ControlData, value: any) => void;
}

const ControlPanelCard: React.FC<ControlPanelCardProps> = ({ control, onControlChange }) => {
  const sourceButtonClass = (source: string) =>
    `w-full text-white font-bold py-2 px-4 rounded-md transition-colors ${
      control.power_source === source ? 'bg-blue-600' : 'bg-slate-400 hover:bg-slate-500'
    }`;

  return (
    <Card>
      <div className="flex items-center mb-4 border-b pb-2">
        <SettingsIcon className="h-6 w-6 text-slate-600" />
        <h3 className="text-xl font-semibold text-slate-700 ml-2">Control Panel</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className={sourceButtonClass('solar')} onClick={() => onControlChange('power_source', 'solar')}>
          Solar
        </button>
        <button className={sourceButtonClass('battery')} onClick={() => onControlChange('power_source', 'battery')}>
          Battery
        </button>
        <button className={sourceButtonClass('grid')} onClick={() => onControlChange('power_source', 'grid')}>
          Grid
        </button>
        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors">
          Emergency OFF
        </button>
      </div>
      <div className="mt-6 flex items-center justify-center">
        <label htmlFor="manual-override" className="flex items-center cursor-pointer">
          <div className="relative">
            <input 
              id="manual-override" 
              type="checkbox" 
              className="sr-only" 
              checked={control.manual_override} 
              onChange={(e) => onControlChange('manual_override', e.target.checked)} 
            />
            <div className="block bg-slate-300 w-14 h-8 rounded-full"></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${control.manual_override ? 'transform translate-x-6 bg-blue-500' : ''}`}></div>
          </div>
          <div className="ml-3 text-slate-600 font-medium">
            Manual Override
          </div>
        </label>
      </div>
    </Card>
  );
};

export default ControlPanelCard;
