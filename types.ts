
export interface SensorData {
  voltage: number;
  solar_current: number;
  load_current: number;
  battery_level: number;
  battery_voltage: number;
  solar_power: number;
  load_power: number;
}

export interface ControlData {
  power_source: 'solar' | 'grid' | 'battery';
  manual_override: boolean;
  source_relays: number[];
  zone_relays: number[];
}

export interface Zone {
  name: string;
  powered: boolean;
  priority: number;
  power_required: number;
  current_usage: number;
}

export interface Zones {
  [key: string]: Zone;
}

export interface LlmData {
  last_decision: string;
  last_action: string;
  efficiency_score: number;
}

export interface StatusData {
  system_health: 'optimal' | 'warning' | 'critical';
  issues_detected: number;
  uptime_hours: number;
}

export interface MicrogridData {
  timestamp: string;
  sensors: SensorData;
  control: ControlData;
  zones: Zones;
  llm: LlmData;
  status: StatusData;
}

export interface HistoryDataPoint {
  time: string;
  solar_power: number;
  load_power: number;
  battery_level: number;
}
