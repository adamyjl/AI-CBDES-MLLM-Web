import React from 'react';
import { TARGET_PLATFORMS } from '../constants';
import { Target, Map, Activity, Cpu, CheckCircle2 } from 'lucide-react';

export const ProjectCenter: React.FC = () => {
  return (
    <div className="h-full w-full bg-slate-950 p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Project Center AI-CBDES-MLLM</h1>
          <p className="text-slate-400">Define ODD, operational constraints, and target deployment hardware.</p>
        </div>

        {/* Section 1: Basic Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-brand-500" /> Project Definition
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Project Name</label>
              <input type="text" defaultValue="Urban-Pilot-L2+" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-brand-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">SOP Date</label>
              <input type="date" defaultValue="2025-12-30" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-brand-500 outline-none" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
              <textarea className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-brand-500 outline-none h-20" defaultValue="L2+ Urban Navigation Pilot focusing on complex intersection handling and VRU interactions." />
            </div>
          </div>
        </div>

        {/* Section 2: ODD & Scenarios */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Map className="h-5 w-5 text-emerald-500" /> ODD & Scenario Sets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Urban High Density', 'Highway Ramp Merge', 'Night & Rain', 'School Zones', 'Construction Areas', 'Unprotected Turns'].map(scene => (
              <label key={scene} className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer hover:border-emerald-500/50 transition-colors">
                <div className="relative flex items-center">
                  <input type="checkbox" defaultChecked className="peer h-4 w-4 appearance-none rounded border border-slate-600 bg-slate-900 checked:bg-emerald-500 checked:border-emerald-500" />
                  <CheckCircle2 className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <span className="text-sm text-slate-300">{scene}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Section 3: Target Platform */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-purple-500" /> Target Deployment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {TARGET_PLATFORMS.map(platform => (
              <div key={platform.id} className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-105 ${platform.id === 'orin' ? 'bg-purple-900/10 border-purple-500 ring-1 ring-purple-500/50' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${platform.type === 'Cloud' ? 'bg-blue-900/30 text-blue-400' : 'bg-amber-900/30 text-amber-400'}`}>{platform.type}</span>
                  {platform.id === 'orin' && <div className="h-3 w-3 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>}
                </div>
                <div className="font-bold text-white mb-1">{platform.name}</div>
                <div className="text-xs text-slate-500 font-mono">{platform.tops} TOPS</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: KPI Targets */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-amber-500" /> KPI Goals
          </h3>
          <div className="flex gap-6 overflow-x-auto pb-2">
            {[
              { label: 'E2E Latency', unit: 'ms', target: '< 100' },
              { label: 'MPI (Miles Per Intervention)', unit: 'miles', target: '> 50' },
              { label: 'Comfort (Jerk)', unit: 'm/s³', target: '< 2.0' },
              { label: 'Pass Rate (Core)', unit: '%', target: '> 99.5' },
            ].map((kpi, idx) => (
              <div key={idx} className="min-w-[180px] p-4 bg-slate-950 border border-slate-800 rounded-lg">
                <div className="text-xs text-slate-500 uppercase mb-1">{kpi.label}</div>
                <div className="text-2xl font-mono text-white font-bold">{kpi.target} <span className="text-sm text-slate-600 font-sans font-normal">{kpi.unit}</span></div>
              </div>
            ))}
            <div className="min-w-[180px] p-4 border border-dashed border-slate-700 rounded-lg flex items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-800 hover:text-slate-300 hover:border-slate-500 transition-colors">
              + Add Metric
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg shadow-lg shadow-brand-500/20 transition-all">
            Save Project Configuration
          </button>
        </div>

      </div>
    </div>
  );
};
