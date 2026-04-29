
import React from 'react';
import type { LlmData } from '../types';
import Card from './Card';
import { HistoryIcon } from './icons';

const mockLogs = [
    "Optimized zone distribution for efficiency",
    "Detected voltage spike, stabilized system",
    "Scheduled battery charging during low-cost grid hours",
    "Predicted high solar output, pre-cooled critical zones"
];

const LlmLogCard: React.FC<{ llm: LlmData }> = ({ llm }) => {
  return (
    <Card>
      <div className="flex items-center mb-4 border-b pb-2">
        <HistoryIcon className="h-6 w-6 text-purple-500" />
        <h3 className="text-xl font-semibold text-slate-700 ml-2">AI Decision Log</h3>
      </div>
      <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
        <div className="bg-slate-100 p-2 rounded-md text-sm">
          <strong className="text-slate-600">{new Date(llm.last_action).toLocaleTimeString()}:</strong> 
          <span className="text-slate-800"> {llm.last_decision}</span>
        </div>
        {mockLogs.map((log, index) => (
            <div key={index} className="bg-slate-100 p-2 rounded-md text-sm">
                 <strong className="text-slate-500">{(new Date(Date.now() - (index + 2) * 3600000)).toLocaleTimeString()}:</strong>
                 <span className="text-slate-700"> {log}</span>
            </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t text-center">
        <span className="text-slate-600 font-medium">AI Efficiency Score:</span>
        <span className="text-2xl font-bold text-green-600 ml-2">{llm.efficiency_score}%</span>
      </div>
    </Card>
  );
};

export default LlmLogCard;
