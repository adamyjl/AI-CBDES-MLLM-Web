import React, { useState } from 'react';
import { PROMPT_TECHNIQUES, PROMPT_OPTIMIZERS } from '../constants';
import { MessageSquareCode, Sliders, PlayCircle, GitCommit, Split, Sparkles, Wand2, Lightbulb, Zap } from 'lucide-react';

export const PromptStudio: React.FC = () => {
  const [useOptimizer, setUseOptimizer] = useState(false);

  return (
    <div className="flex h-full w-full bg-slate-950 text-slate-200">
      
      {/* LEFT: Prompt Packages */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
           <h2 className="text-lg font-bold text-white mb-2">Prompt Packages</h2>
           <button className="w-full flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 hover:border-brand-500 text-slate-300 py-2 rounded text-sm transition-colors">
            + New From Template
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
           <div className="p-3 bg-brand-900/10 border border-brand-500/30 rounded-lg cursor-pointer">
              <div className="flex justify-between items-center mb-1">
                 <span className="text-sm font-bold text-white">p0.1-aggressive</span>
                 <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-xs text-slate-400">Decision logic for unprotected left turns.</p>
           </div>
           <div className="p-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg cursor-pointer">
              <div className="flex justify-between items-center mb-1">
                 <span className="text-sm font-bold text-slate-300">p0.1-safe-base</span>
              </div>
              <p className="text-xs text-slate-500">Conservative baseline with high safety weights.</p>
           </div>
        </div>
      </div>

      {/* CENTER: Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-14 border-b border-slate-800 flex justify-between items-center px-4 bg-slate-900/50">
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-brand-400 bg-brand-900/20 px-2 py-1 rounded">v0.1.4 (Draft)</span>
            <div className="h-4 w-px bg-slate-700"></div>
            <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
              <Split className="h-4 w-4" />
              <span>A/B Testing Active</span>
              <div className="relative inline-flex items-center h-5 rounded-full w-9 bg-brand-600">
                 <span className="translate-x-4.5 inline-block w-3.5 h-3.5 transform bg-white rounded-full transition-transform translate-x-1" />
              </div>
            </label>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/20 text-indigo-400 border border-indigo-600/50 rounded text-sm hover:bg-indigo-600/30 transition-all">
              <Sparkles className="h-4 w-4" /> Run Eval
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-brand-600 text-white rounded text-sm hover:bg-brand-500 shadow-lg shadow-brand-500/20 transition-all">
              <GitCommit className="h-4 w-4" /> Commit
            </button>
          </div>
        </div>

        {/* Code Area */}
        <div className="flex-1 flex overflow-hidden">
           <div className="flex-1 p-4 font-mono text-sm bg-[#0d1117] text-slate-300 overflow-y-auto outline-none resize-none">
              <div className="text-slate-500 select-none mb-2 border-b border-slate-800 pb-1 flex justify-between">
                <span># SYSTEM INSTRUCTION</span>
                <span className="text-xs text-slate-600">Token Count: 1,420</span>
              </div>
              <textarea className="w-full bg-transparent outline-none h-[600px] text-slate-300 leading-relaxed" spellCheck={false} defaultValue={`# ROLE
You are "AutoDrive-Agent", an expert autonomous driving decision-making system. 
Your input is a structured JSON description of the environment (Ego State, Perception, Map). 
Your output must be a JSON object containing the trajectory plan and control signals.

# SAFETY CONSTRAINTS (HIGHEST PRIORITY)
1. Never collide with VRUs (Vulnerable Road Users). Maintain >1.5m lateral distance.
2. Adhere to speed limits unless emergency evasion is required.
3. Max jerk shall not exceed 2.0 m/s^3 for passenger comfort.

# REASONING STRATEGY (Chain-of-Thought)
1. **Perception Analysis**: Identify critical objects and their forecasted intent.
2. **Risk Assessment**: Calculate Time-to-Collision (TTC) for all dynamic objects.
3. **Behavior Selection**: Choose a high-level semantic action (Yield, Overtake, Follow).
4. **Trajectory Generation**: Plan path points (x, y, t).

# FEW-SHOT EXAMPLE
[Input]: {
  "ego": {"v": 10.0, "state": "lane_keep"},
  "objects": [{"id": 1, "type": "pedestrian", "pos": [20, -2], "v": [0, 1.5]}]
}
[Thought]:
- Pedestrian 1 is moving perpendicular to the road (y-velocity 1.5m/s).
- Predicted to enter ego lane in 1.3 seconds.
- At current speed 10m/s, ego will reach x=20 in 2.0 seconds.
- RISK: High collision probability if speed maintained.
- ACTION: Yield. Decelerate to stop before x=15.
[Output]: {
  "decision": "YIELD",
  "reason": "Pedestrian crossing from right",
  "target_speed": 0.0,
  "trajectory": [...] 
}`} />
           </div>
        </div>
      </div>

      {/* RIGHT: Engineering & Parameters */}
      <div className="w-80 bg-slate-900 border-l border-slate-800 overflow-y-auto">
        
        {/* Engineering Tactics */}
        <div className="p-5 border-b border-slate-800">
           <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
             <Lightbulb className="h-4 w-4 text-amber-400" /> Engineering Tactics
           </h3>
           <div className="space-y-3">
             {PROMPT_TECHNIQUES.map(tech => (
               <label key={tech.id} className="flex items-start gap-3 p-2 rounded hover:bg-slate-800 cursor-pointer group">
                  <input type="checkbox" className="mt-1 rounded border-slate-600 bg-slate-950 text-brand-500 focus:ring-0" />
                  <div>
                    <span className="block text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{tech.label}</span>
                    <span className="block text-xs text-slate-500 leading-tight mt-0.5">{tech.desc}</span>
                  </div>
               </label>
             ))}
           </div>
        </div>

        {/* Optimization Methods */}
        <div className="p-5 border-b border-slate-800">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-sm font-bold text-white flex items-center gap-2">
               <Wand2 className="h-4 w-4 text-purple-400" /> Auto-Optimization
             </h3>
             <div className={`relative inline-flex items-center h-4 rounded-full w-8 cursor-pointer transition-colors ${useOptimizer ? 'bg-purple-600' : 'bg-slate-700'}`} onClick={() => setUseOptimizer(!useOptimizer)}>
                <span className={`inline-block w-3 h-3 transform bg-white rounded-full transition-transform ${useOptimizer ? 'translate-x-4' : 'translate-x-1'}`} />
             </div>
           </div>
           
           <div className={`space-y-3 transition-opacity ${useOptimizer ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <select className="w-full bg-slate-950 border border-slate-700 rounded text-xs px-2 py-2 text-slate-300 outline-none focus:border-purple-500">
                <option value="">Select Optimizer...</option>
                {PROMPT_OPTIMIZERS.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
              <div className="text-[10px] text-slate-500 bg-slate-950 p-2 rounded border border-slate-800">
                 <span className="font-bold text-purple-400">DSPy</span> will compile your prompt into optimized weights by running 50 iterations against the "Urban-Day" validation set.
              </div>
           </div>
        </div>

        {/* Basic Parameters */}
        <div className="p-5">
           <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Sliders className="h-4 w-4" /> Parameters
           </h3>
           <div className="space-y-5">
             <div>
               <div className="flex justify-between text-xs text-slate-400 mb-1">
                 <span>Temperature</span>
                 <span>0.4</span>
               </div>
               <input type="range" className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
             </div>
             
             <div>
               <div className="flex justify-between text-xs text-slate-400 mb-1">
                 <span>Top P</span>
                 <span>0.95</span>
               </div>
               <input type="range" className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
             </div>

             <div className="border-t border-slate-800 pt-4">
               <h4 className="text-xs font-bold text-slate-300 mb-2">Safety Rollback</h4>
               <div className="p-3 bg-slate-950 rounded border border-slate-800">
                 <label className="flex items-center gap-2 mb-2">
                   <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-900" />
                   <span className="text-xs text-slate-400">Auto-Revert on Fail</span>
                 </label>
                 <div className="text-[10px] text-slate-500">
                   Triggers if safety violation rate > 0.5% in Evaluation Gate.
                 </div>
               </div>
             </div>
          </div>
        </div>

      </div>

    </div>
  );
};
