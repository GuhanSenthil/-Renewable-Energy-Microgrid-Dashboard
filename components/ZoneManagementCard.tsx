
import React from 'react';
import type { Zones, Zone } from '../types';
import Card from './Card';
import { PowerIcon } from './icons';

interface ZoneItemProps {
  zoneKey: string;
  zone: Zone;
  onToggle: (zoneKey: string) => void;
}

const ZoneItem: React.FC<ZoneItemProps> = ({ zoneKey, zone, onToggle }) => {
  const poweredClasses = zone.powered ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500 bg-slate-50';
  const buttonClasses = zone.powered ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';
  
  return (
    <div className={`flex justify-between items-center p-3 my-2 rounded-md transition-all ${poweredClasses}`}>
      <div>
        <strong className="text-slate-700">{zone.name}</strong>
        <p className="text-xs text-slate-500">{zone.current_usage.toFixed(1)}A / {zone.power_required}W</p>
      </div>
      <button onClick={() => onToggle(zoneKey)} className={`text-white font-bold py-2 px-4 rounded-md transition-colors ${buttonClasses}`}>
        {zone.powered ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

interface ZoneManagementCardProps {
  zones: Zones;
  onToggleZone: (zoneKey: string) => void;
}

const ZoneManagementCard: React.FC<ZoneManagementCardProps> = ({ zones, onToggleZone }) => {
  return (
    <Card>
      <div className="flex items-center mb-4 border-b pb-2">
        <PowerIcon className="h-6 w-6 text-blue-500" />
        <h3 className="text-xl font-semibold text-slate-700 ml-2">Zone Management</h3>
      </div>
      <div>
        {Object.entries(zones).map(([key, zone]) => (
          <ZoneItem key={key} zoneKey={key} zone={zone} onToggle={onToggleZone} />
        ))}
      </div>
    </Card>
  );
};

export default ZoneManagementCard;
