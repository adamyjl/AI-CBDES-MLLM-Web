import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { KPI_DATA, TRAINING_LOSS_DATA, CODE_QUALITY_DATA } from '../constants';
import { AlertCircle, CheckCircle, RotateCcw, AlertTriangle, PlayCircle, ShieldCheck, Activity, Terminal, Zap, FileText, Clock, AlertOctagon } from 'lucide-react';

const SCENARIO_STATS = [
  { name: 'Urban-Day', pass: 98, fail: 2 },
  { name: 'Urban-Night', pass: 92, fail: 8 },
  { name: 'Highway-Rain', pass: 88, fail: 12 },
  { name: 'Construction', pass: 76, fail: 24 },
  { name: 'Unprotected-Left', pass: 85, fail: 15 },
];

const EVALUATION_CASES = [
  { id: 'C-20260112-001', name: 'Unprotected Left Turn - VRU Yield', time: '09:15:22', description: 'Ego vehicle yielding to pedestrian crossing from right at intersection.', status: 'Pass', severity: 'Critical' },
  { id: 'C-20260112-002', name: 'Highway Merge - Dense Traffic', time: '09:42:10', description: 'Merging into 80kph traffic flow with < 20m gap.', status: 'Pass', severity: 'Major' },
  { id: 'C-20260112-003', name: 'Construction Zone - Lane Narrowing', time: '10:15:45', description: 'Navigating temporary lane markers with cones. Lateral deviation > 15cm detected.', status: 'Fail', severity: 'Major' },
  { id: 'C-20260112-004', name: 'Emergency Braking - Cut-in', time: '10:30:00', description: 'Sudden cut-in by vehicle from left lane. TTC < 1.5s.', status: 'Pass', severity: 'Critical' },
  { id: 'C-20260112-005', name: 'Roundabout Entry - Multi-agent', time: '10:55:12', description: 'Entering 2-lane roundabout with 3 dynamic agents.', status: 'Pass', severity: 'Minor' },
  { id: 'C-20260112-006', name: 'Night Rain - Traffic Light Detection', time: '11:10:33', description: 'Detecting state of suspended traffic light in heavy rain conditions. Confidence < threshold.', status: 'Fail', severity: 'Critical' },
];

export const EvaluationGate: React.FC = () => {
  return (
    <div className="flex h-full w-full bg-slate-950 text-slate-200">
      
      {/* LEFT: Scenario Sets */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-lg font-bold text-slate-100">Scenario Sets</h2>
          <p className="text-xs text-slate-500 mt-1">Select ODD for evaluation</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {['Core Functionality', 'Regulation Safety', 'Long-tail Cases', 'Adversarial Attacks', 'Weather Variations'].map((item, idx) => (
             <div key={idx} className={`p-3 rounded cursor-pointer text-sm flex justify-between items-center group ${idx === 0 ? 'bg-brand-900/20 border border-brand-500/30 text-brand-400' : 'hover:bg-slate-800 text-slate-400'}`}>
                <span>{item}</span>
                <span className="text-xs bg-slate-800 px-2 py-0.5 rounded group-hover:bg-slate-700">
                  {120 + idx * 45} cases
                </span>
             </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-800">
           <button className="w-full flex justify-center items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white py-2 rounded text-sm font-medium transition-colors">
             <PlayCircle className="h-4 w-4" /> Run Simulation
           </button>
        </div>
      </div>

      {/* CENTER: Results Dashboard */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-bold text-white">Evaluation Report #2026-01-12</h1>
             <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
               <span>Version: <span className="text-mono text-slate-200">v3.4.1-rc2</span></span>
               <span>Duration: 2h 15m</span>
               <span className="flex items-center gap-1 text-emerald-400"><CheckCircle className="h-3 w-3"/> Passed</span>
             </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">Download Report</button>
            <button className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">View Logs</button>
          </div>
        </div>

        {/* SECTION 1: FUNCTIONAL PERFORMANCE */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4" /> Functional Performance
          </h2>
          <div className="grid grid-cols-2 gap-6 h-[300px]">
            {/* Radar Chart: KPI Comparison */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col">
              <h3 className="text-xs font-semibold text-slate-400 mb-2">KPI vs Baseline</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={KPI_DATA}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: '#475569', fontSize: 10 }} />
                    <Radar name="Current" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Baseline" dataKey="B" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} />
                    <Legend />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart: Pass Rates */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col">
              <h3 className="text-xs font-semibold text-slate-400 mb-2">Pass Rate by ODD</h3>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SCENARIO_STATS} layout="vertical" margin={{ left: 40 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={90} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <Tooltip cursor={{fill: '#334155', opacity: 0.4}} contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} />
                    <Legend />
                    <Bar dataKey="pass" name="Pass" stackId="a" fill="#10b981" barSize={16} radius={[0,0,0,0]} />
                    <Bar dataKey="fail" name="Fail" stackId="a" fill="#f43f5e" barSize={16} radius={[0,4,4,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ENGINEERING HEALTH */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Terminal className="h-4 w-4" /> Engineering Health & Efficiency
          </h2>
          <div className="grid grid-cols-3 gap-6 h-[250px]">
             
             {/* Card 1: Training Loss */}
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col">
                <h3 className="text-xs font-semibold text-slate-400 mb-2">Training Convergence (Loss)</h3>
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={TRAINING_LOSS_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="step" tick={{ fill: '#64748b', fontSize: 10 }} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} />
                      <Line type="monotone" dataKey="train" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="val" stroke="#f43f5e" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
             </div>

             {/* Card 2: Code Quality */}
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col">
                <h3 className="text-xs font-semibold text-slate-400 mb-2">Code Quality Metrics</h3>
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="70%" data={CODE_QUALITY_DATA}>
                       <PolarGrid stroke="#334155" />
                       <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                       <Radar name="Score" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                       <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} />
                     </RadarChart>
                  </ResponsiveContainer>
                </div>
             </div>

             {/* Card 3: System Efficiency */}
             <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-center space-y-4">
                <h3 className="text-xs font-semibold text-slate-400">Implementation Efficiency</h3>
                
                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Inference Latency (P99)</span>
                      <span className="text-white font-mono">12.4 ms</span>
                   </div>
                   <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[30%]"></div>
                   </div>
                   <div className="text-[10px] text-slate-500 mt-1">Target: &lt; 40ms</div>
                </div>

                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Memory Footprint</span>
                      <span className="text-white font-mono">2.1 GB</span>
                   </div>
                   <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[70%]"></div>
                   </div>
                   <div className="text-[10px] text-slate-500 mt-1">Warning: Approaching edge limit (3GB)</div>
                </div>

                <div>
                   <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Energy (Watts)</span>
                      <span className="text-white font-mono">25 W</span>
                   </div>
                   <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[50%]"></div>
                   </div>
                </div>

             </div>

          </div>
        </section>

        {/* SECTION 3: DETAILED CASE LOG */}
        <section>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4" /> Case Execution Log
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/50 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-800">
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Case Name / ID</th>
                    <th className="px-6 py-3">Time (2026-01-12)</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3 text-right">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {EVALUATION_CASES.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        {item.status === 'Pass' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle className="h-3 w-3" /> Pass
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            <AlertCircle className="h-3 w-3" /> Fail
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">{item.name}</div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">{item.id}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 font-mono">
                        <div className="flex items-center gap-2">
                           <Clock className="h-3 w-3 text-slate-600" />
                           {item.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 max-w-md">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 text-right">
                         <span className={`text-xs font-medium ${
                           item.severity === 'Critical' ? 'text-rose-400' :
                           item.severity === 'Major' ? 'text-amber-400' : 'text-slate-400'
                         }`}>
                           {item.severity}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-slate-950/30 border-t border-slate-800 flex justify-center">
               <button className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1 transition-colors">
                 View All 1,420 Cases <Activity className="h-3 w-3" />
               </button>
            </div>
          </div>
        </section>

      </div>

      {/* RIGHT: Gate Policies */}
      <div className="w-80 border-l border-slate-800 bg-slate-900 p-5 space-y-6">
        <div>
           <h3 className="text-md font-bold text-white mb-4 flex items-center gap-2">
             <ShieldCheck className="h-5 w-5 text-emerald-400" /> Gate Policies
           </h3>
           <div className="space-y-4">
             <div className="p-3 bg-slate-800 rounded border border-slate-700">
               <div className="flex justify-between items-start mb-2">
                 <span className="text-sm font-medium text-slate-200">Safety Critical</span>
                 <div className="w-8 h-4 bg-emerald-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full"></div></div>
               </div>
               <p className="text-xs text-slate-500">Block release if collision rate &gt; 0% in core scenarios.</p>
             </div>
             
             <div className="p-3 bg-slate-800 rounded border border-slate-700">
               <div className="flex justify-between items-start mb-2">
                 <span className="text-sm font-medium text-slate-200">Quality Gate</span>
                 <div className="w-8 h-4 bg-emerald-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full"></div></div>
               </div>
               <p className="text-xs text-slate-500">Block if Test Coverage &lt; 80% or any critical lint errors.</p>
             </div>
           </div>
        </div>

        <div>
           <h3 className="text-md font-bold text-white mb-4 flex items-center gap-2">
             <RotateCcw className="h-5 w-5 text-amber-400" /> Auto-Rollback
           </h3>
           <div className="bg-slate-800/50 border border-amber-900/30 p-3 rounded">
             <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase mb-2">
               <AlertTriangle className="h-3 w-3" /> Trigger Conditions
             </div>
             <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
               <li>Performance Regression &gt; 10%</li>
               <li>Any Safety Critical failure</li>
               <li>Inference latency &gt; 30ms (P99)</li>
             </ul>
           </div>
           <button className="w-full mt-4 border border-slate-700 hover:bg-slate-800 text-slate-400 text-xs py-2 rounded">
             Configure Thresholds
           </button>
        </div>
      </div>

    </div>
  );
};