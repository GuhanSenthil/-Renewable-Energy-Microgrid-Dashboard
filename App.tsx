
import React, { useState, useEffect, useCallback } from 'react';
import { MicrogridData, HistoryDataPoint, Zone, Zones } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Card from './components/Card';
import GaugeChart from './components/GaugeChart';
import PowerDistributionChart from './components/PowerDistributionChart';
import ZoneManagementCard from './components/ZoneManagementCard';
import ControlPanelCard from './components/ControlPanelCard';
import LlmLogCard from './components/LlmLogCard';
import HistoricalChart from './components/HistoricalChart';

const initialMicrogridData: MicrogridData = {
  timestamp: "2023-11-15T10:30:45Z",
  sensors: {
    voltage: 220.5,
    solar_current: 2.1,
    load_current: 3.5,
    battery_level: 85,
    battery_voltage: 3.8,
    solar_power: 462.5,
    load_power: 770.0
  },
  control: {
    power_source: "solar",
    manual_override: false,
    source_relays: [1, 0, 1, 0],
    zone_relays: [1, 1, 1, 0]
  },
  zones: {
    zone1: { name: "Critical Loads", powered: true, priority: 1, power_required: 50, current_usage: 0.8 },
    zone2: { name: "Important Loads", powered: true, priority: 2, power_required: 100, current_usage: 1.2 },
    zone3: { name: "Non-essential Loads", powered: true, priority: 3, power_required: 150, current_usage: 2.1 },
    zone4: { name: "Deferrable Loads", powered: false, priority: 4, power_required: 200, current_usage: 0.0 }
  },
  llm: {
    last_decision: "Switched to grid due to low battery",
    last_action: "2023-11-15T10:25:30Z",
    efficiency_score: 92
  },
  status: {
    system_health: "optimal",
    issues_detected: 0,
    uptime_hours: 120
  }
};

const initialHistory: HistoryDataPoint[] = [
  { time: "10:00", solar_power: 450, load_power: 720, battery_level: 82 },
  { time: "10:05", solar_power: 455, load_power: 725, battery_level: 82.5 },
  { time: "10:10", solar_power: 460, load_power: 730, battery_level: 83 },
  { time: "10:15", solar_power: 480, load_power: 750, battery_level: 83.5 },
  { time: "10:20", solar_power: 475, load_power: 760, battery_level: 84 },
  { time: "10:25", solar_power: 470, load_power: 765, battery_level: 84.5 },
  { time: "10:30", solar_power: 462, load_power: 770, battery_level: 85 }
];


const App: React.FC = () => {
  const [data, setData] = useState<MicrogridData>(initialMicrogridData);
  const [history, setHistory] = useState<HistoryDataPoint[]>(initialHistory);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newSensors = { ...prevData.sensors };
        newSensors.voltage = 220 + (Math.random() * 5 - 2.5);
        newSensors.solar_power += (Math.random() * 20 - 10);
        newSensors.solar_power = Math.max(0, newSensors.solar_power);
        newSensors.load_power = 770 + (Math.random() * 30 - 15);

        const powerDifference = newSensors.solar_power - newSensors.load_power;
        newSensors.battery_level += (powerDifference > 0 ? 0.1 : -0.2) + (Math.random() * 0.05);
        newSensors.battery_level = Math.max(0, Math.min(100, newSensors.battery_level));
        
        const newStatus = { ...prevData.status };
        newStatus.uptime_hours += 1/3600; // Update uptime
        if (newSensors.voltage > 240 || newSensors.voltage < 200) {
            newStatus.system_health = 'warning';
        } else if (newSensors.battery_level < 20) {
            newStatus.system_health = 'critical';
        } else {
            newStatus.system_health = 'optimal';
        }


        const now = new Date();
        const newHistoryPoint: HistoryDataPoint = {
            time: `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`,
            solar_power: newSensors.solar_power,
            load_power: newSensors.load_power,
            battery_level: newSensors.battery_level,
        };

        setHistory(prevHistory => [...prevHistory.slice(-20), newHistoryPoint]);

        return {
          ...prevData,
          sensors: newSensors,
          status: newStatus,
          timestamp: now.toISOString(),
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  
  const handleZoneToggle = useCallback((zoneKey: string) => {
      setData(prevData => {
          const newZones: Zones = { ...prevData.zones };
          const zoneToToggle = newZones[zoneKey];
          if(zoneToToggle) {
              newZones[zoneKey] = { ...zoneToToggle, powered: !zoneToToggle.powered };
          }
          return { ...prevData, zones: newZones };
      });
  }, []);

  const handleControlChange = useCallback((controlKey: keyof MicrogridData['control'], value: any) => {
    setData(prevData => ({
      ...prevData,
      control: {
        ...prevData.control,
        [controlKey]: value,
      },
    }));
  }, []);


  const { sensors, status, timestamp, zones, control, llm } = data;

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <Header status={status} lastUpdate={timestamp} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
            <Card>
                <GaugeChart title="Grid Voltage" value={sensors.voltage} max={250} unit="V" color="#3498db" />
            </Card>
            <Card>
                <GaugeChart title="Solar Power" value={sensors.solar_power} max={1000} unit="W" color="#f1c40f" />
            </Card>
            <Card>
                <GaugeChart title="Battery Level" value={sensors.battery_level} max={100} unit="%" color="#2ecc71" />
            </Card>
            <Card>
                <PowerDistributionChart data={{ solar: sensors.solar_power, load: sensors.load_power, battery: sensors.battery_level }} />
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
                <Card fullHeight={true}>
                    <h3 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-2">Historical Trends</h3>
                    <HistoricalChart data={history} />
                </Card>
            </div>
            <div className="lg:col-span-1 grid grid-rows-1 gap-6">
                <ZoneManagementCard zones={zones} onToggleZone={handleZoneToggle} />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ControlPanelCard control={control} onControlChange={handleControlChange} />
            <LlmLogCard llm={llm} />
        </div>

      </main>
    </div>
  );
};

export default App;
