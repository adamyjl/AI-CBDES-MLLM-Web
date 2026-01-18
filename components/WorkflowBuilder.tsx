import React, { useState, useRef } from 'react';
import { INITIAL_NODES, INITIAL_EDGES, MODULE_CATEGORIES } from '../constants';
import { NodeData, NodeType } from '../types';
import { 
  Play, 
  Save, 
  RotateCcw, 
  Search, 
  Settings2, 
  Layers, 
  Box, 
  Cpu, 
  FileJson,
  CheckCircle2,
  AlertTriangle,
  Zap,
  BrainCircuit,
  ShieldCheck,
  Rocket,
  Move,
  Eye,
  Activity,
  GitBranch,
  Terminal,
  Grid
} from 'lucide-react';

export const WorkflowBuilder: React.FC = () => {
  const [nodes, setNodes] = useState<NodeData[]>(INITIAL_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // Panning State
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only pan if clicking on background or svg, not on nodes
    if ((e.target as HTMLElement).classList.contains('canvas-bg')) {
      setIsPanning(true);
      setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - startPan.x, y: e.clientY - startPan.y });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Helper to render curved connections
  const renderConnection = (edge: any) => {
    const startNode = nodes.find(n => n.id === edge.source);
    const endNode = nodes.find(n => n.id === edge.target);
    if (!startNode || !endNode) return null;

    // Simple bezier curve calculation
    const startX = startNode.x + 200; // Right side of node box
    const startY = startNode.y + 40;  // Middle of node box
    const endX = endNode.x;
    const endY = endNode.y + 40;

    const controlPoint1X = startX + (endX - startX) / 2;
    const controlPoint1Y = startY;
    const controlPoint2X = startX + (endX - startX) / 2;
    const controlPoint2Y = endY;

    const pathD = `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}`;
    
    const isControl = edge.type === 'control';

    return (
      <g key={edge.id}>
        <path 
          d={pathD} 
          fill="none" 
          stroke={isControl ? "#f43f5e" : "#64748b"} 
          strokeWidth="2" 
          strokeDasharray={isControl ? "5,5" : "none"}
          className="transition-all duration-300"
        />
        <circle cx={endX} cy={endY} r="3" fill={isControl ? "#f43f5e" : "#64748b"} />
        <text x={(startX+endX)/2} y={(startY+endY)/2 - 10} fill="#94a3b8" fontSize="10" textAnchor="middle" className="bg-slate-900">
          {edge.label}
        </text>
      </g>
    );
  };

  return (
    <div className="flex h-full w-full bg-slate-950 overflow-hidden text-slate-200" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      
      {/* LEFT: Module Library */}
      <div className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col z-20 shadow-xl">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-3">Module Library</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search components..." 
              className="w-full bg-slate-800 border border-slate-700 rounded text-sm pl-9 pr-3 py-2 focus:outline-none focus:border-brand-500 text-slate-200"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {MODULE_CATEGORIES.map((cat, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2 uppercase">
                <span>{cat.name}</span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">{cat.count}</span>
              </div>
              <div className="space-y-2">
                {/* Mock items for category */}
                <div className="bg-slate-800 p-2 rounded border border-slate-700 hover:border-brand-500 cursor-pointer flex items-center gap-2 transition-colors group">
                  <Cpu className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300" />
                  <span className="text-sm">Standard {cat.name} V1</span>
                </div>
                <div className="bg-slate-800 p-2 rounded border border-slate-700 hover:border-brand-500 cursor-pointer flex items-center gap-2 transition-colors group">
                  <BrainCircuit className="h-4 w-4 text-purple-400 group-hover:text-purple-300" />
                  <span className="text-sm">Advanced {cat.name} VLM</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER: Canvas */}
      <div 
        ref={containerRef}
        className="flex-1 relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] overflow-hidden cursor-grab active:cursor-grabbing canvas-bg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        
        {/* Top Toolbar */}
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center pointer-events-none">
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-lg p-2 pointer-events-auto flex gap-2 shadow-lg">
            <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors" title="Zoom In">+</button>
            <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors" title="Zoom Out">-</button>
            <div className="w-px bg-slate-600 mx-1"></div>
            <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <Layers className="h-4 w-4" /> <span className="text-xs">Layers</span>
            </button>
             <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white flex items-center gap-2 transition-colors" onClick={() => setPan({x:0, y:0})}>
              <Move className="h-4 w-4" /> <span className="text-xs">Reset View</span>
            </button>
          </div>
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-lg px-3 py-1.5 pointer-events-auto shadow-lg">
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              SYSTEM READY
            </span>
          </div>
        </div>

        {/* Pan Container */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none transform transition-transform duration-75 ease-out"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
        >
            {/* The Graph */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
              {INITIAL_EDGES.map(renderConnection)}
            </svg>

            <div className="absolute inset-0 z-0">
              {nodes.map(node => (
                <div 
                  key={node.id}
                  onClick={(e) => { e.stopPropagation(); setSelectedNodeId(node.id); }}
                  className={`absolute w-[200px] h-[80px] rounded-lg border-2 bg-slate-900 shadow-xl cursor-pointer transition-all hover:scale-105 pointer-events-auto
                    ${selectedNodeId === node.id ? 'border-brand-500 ring-4 ring-brand-500/20 z-10' : 'border-slate-700 hover:border-slate-500'}
                  `}
                  style={{ left: node.x, top: node.y }}
                >
                  {/* Header */}
                  <div className={`h-1/2 px-3 flex items-center gap-2 rounded-t-[6px] border-b border-slate-800 ${
                    node.type === NodeType.VLM ? 'bg-purple-900/20' : 
                    node.type === NodeType.VLA ? 'bg-orange-900/20' : 
                    node.type === NodeType.RULE ? 'bg-blue-900/20' : 'bg-slate-800'
                  }`}>
                    {node.type === NodeType.VLM && <BrainCircuit className="h-4 w-4 text-purple-400" />}
                    {node.type === NodeType.VLA && <Zap className="h-4 w-4 text-orange-400" />}
                    {node.type === NodeType.RULE && <Box className="h-4 w-4 text-blue-400" />}
                    {node.type === NodeType.SOTA && <Cpu className="h-4 w-4 text-emerald-400" />}
                    <span className="text-xs font-bold truncate text-slate-200">{node.label}</span>
                  </div>
                  
                  {/* Body */}
                  <div className="h-1/2 px-3 flex items-center justify-between text-[10px] text-slate-400">
                    <div className="flex flex-col">
                      <span>IN: {node.inputs.length}</span>
                    </div>
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded ${
                      node.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                      node.status === 'running' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-slate-700 text-slate-400'
                    }`}>
                      {node.status === 'success' && <CheckCircle2 className="h-3 w-3" />}
                      {node.status === 'running' && <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>}
                      {node.status}
                    </div>
                    <div className="flex flex-col text-right">
                      <span>OUT: {node.outputs.length}</span>
                    </div>
                  </div>

                  {/* Ports */}
                  <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 bg-slate-600 rounded-full border border-slate-900 hover:bg-brand-500 transition-colors"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-slate-600 rounded-full border border-slate-900 hover:bg-brand-500 transition-colors"></div>
                </div>
              ))}
            </div>
        </div>

        {/* BOTTOM: Action Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-slate-800/90 backdrop-blur border border-slate-700 rounded-xl shadow-2xl p-2 flex items-center gap-2">
             <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 text-sm font-medium transition-colors border border-slate-600">
               <Cpu className="h-4 w-4" /> Assemble
             </button>
             <div className="w-8 h-0.5 bg-slate-600"></div>
             <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
               <ShieldCheck className="h-4 w-4" /> Run Gate Eval
             </button>
             <div className="w-8 h-0.5 bg-slate-600"></div>
             <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20">
               <Rocket className="h-4 w-4" /> Release
             </button>
          </div>
          <div className="text-center mt-2 text-[10px] text-slate-500 uppercase tracking-widest">
            Evidence Chain Recording Active
          </div>
        </div>

      </div>

      {/* RIGHT: Property Panel */}
      <div className="w-96 border-l border-slate-800 bg-slate-900 overflow-y-auto z-20 shadow-xl">
        {selectedNode ? (
          <div className="p-5 space-y-6">
            
            {/* VLA SPECIALIZED VIEW */}
            {selectedNode.type === NodeType.VLA ? (
              <>
                 <div className="pb-4 border-b border-slate-800">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-bold text-white">{selectedNode.label}</h3>
                       <span className="text-xs font-bold text-orange-400 bg-orange-900/20 px-2 py-1 rounded border border-orange-500/30">VLA CORE</span>
                    </div>
                    <p className="text-xs text-slate-400">Vision-Language-Action End-to-End Model. Processes sensor inputs and directly outputs planning trajectories.</p>
                 </div>

                 {/* Internal Attention Map (Neural Network Visualization) */}
                 <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-2">
                      <Eye className="h-3 w-3" /> Internal Attention
                    </h4>
                    <div className="aspect-video bg-slate-950 rounded border border-slate-700 relative overflow-hidden group">
                       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
                       
                       {/* Neural Network SVG */}
                       <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
                          <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                            </linearGradient>
                            <filter id="glow">
                              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>

                          {/* Connections */}
                          {Array.from({ length: 4 }).map((_, layerIndex) => {
                             if (layerIndex === 3) return null;
                             return Array.from({ length: 6 }).map((_, nodeIndex) => (
                               Array.from({ length: 6 }).map((_, targetIndex) => (
                                 <line 
                                   key={`${layerIndex}-${nodeIndex}-${targetIndex}`}
                                   x1={50 + layerIndex * 100} 
                                   y1={30 + nodeIndex * 25} 
                                   x2={50 + (layerIndex + 1) * 100} 
                                   y2={30 + targetIndex * 25} 
                                   stroke="url(#grad1)" 
                                   strokeWidth="0.5"
                                 />
                               ))
                             ));
                          })}

                          {/* Nodes */}
                          {Array.from({ length: 4 }).map((_, layerIndex) => (
                             <g key={layerIndex}>
                               {Array.from({ length: 6 }).map((_, nodeIndex) => (
                                 <circle 
                                   key={nodeIndex}
                                   cx={50 + layerIndex * 100} 
                                   cy={30 + nodeIndex * 25} 
                                   r={layerIndex === 0 || layerIndex === 3 ? 3 : 4} 
                                   fill={layerIndex === 0 ? '#3b82f6' : layerIndex === 3 ? '#ec4899' : '#8b5cf6'}
                                   filter="url(#glow)"
                                   className="animate-pulse"
                                   style={{ animationDelay: `${layerIndex * 0.2 + nodeIndex * 0.1}s`, animationDuration: '2s' }}
                                 />
                               ))}
                             </g>
                          ))}
                          
                          {/* Active Path highlight */}
                          <path 
                             d="M 50 55 L 150 80 L 250 105 L 350 80" 
                             fill="none" 
                             stroke="#fbbf24" 
                             strokeWidth="2" 
                             strokeDasharray="4"
                             className="animate-[dash_1s_linear_infinite]"
                             filter="url(#glow)"
                          />
                          <style>{`
                            @keyframes dash {
                              to {
                                stroke-dashoffset: -8;
                              }
                            }
                          `}</style>
                       </svg>

                       <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-black/60 backdrop-blur px-2 py-0.5 rounded border border-slate-700">
                         Layer 14: Cross-Attn <span className="text-emerald-400">Active</span>
                       </div>
                    </div>
                 </div>

                 {/* Inference Stats */}
                 <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950 p-3 rounded border border-slate-800">
                       <div className="text-xs text-slate-500 mb-1">Inference Time</div>
                       <div className="text-lg font-mono text-white">42<span className="text-sm text-slate-600">ms</span></div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800">
                       <div className="text-xs text-slate-500 mb-1">Token Usage</div>
                       <div className="text-lg font-mono text-white">1.2<span className="text-sm text-slate-600">k</span></div>
                    </div>
                 </div>

                 {/* Chain of Thought Reasoning */}
                 <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-2">
                      <GitBranch className="h-3 w-3" /> Reasoning Chain
                    </h4>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-[10px] text-slate-300 space-y-2">
                       <div className="flex gap-2">
                          <span className="text-slate-600">01.</span>
                          <span>Detected <span className="text-orange-400">Pedestrian</span> at [20, -2].</span>
                       </div>
                       <div className="flex gap-2">
                          <span className="text-slate-600">02.</span>
                          <span>Predict <span className="text-purple-400">Movement</span> towards lane center.</span>
                       </div>
                       <div className="flex gap-2">
                          <span className="text-slate-600">03.</span>
                          <span>Decision: <span className="text-red-400 font-bold">YIELD</span> (Decelerate -1.5m/s²).</span>
                       </div>
                    </div>
                 </div>

                 {/* Modality Alignment */}
                 <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-2">
                      <Grid className="h-3 w-3" /> Modality Alignment
                    </h4>
                    <div className="space-y-1">
                       <div className="flex justify-between text-xs items-center bg-slate-800/50 p-2 rounded">
                          <span className="text-slate-400">Lidar Point Cloud</span>
                          <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                             <div className="w-full h-full bg-emerald-500"></div>
                          </div>
                       </div>
                       <div className="flex justify-between text-xs items-center bg-slate-800/50 p-2 rounded">
                          <span className="text-slate-400">Camera RGB</span>
                          <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                             <div className="w-[85%] h-full bg-emerald-500"></div>
                          </div>
                       </div>
                       <div className="flex justify-between text-xs items-center bg-slate-800/50 p-2 rounded">
                          <span className="text-slate-400">HD Map Vector</span>
                          <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                             <div className="w-[92%] h-full bg-emerald-500"></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </>
            ) : (
              // GENERIC NODE VIEW
              <>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{selectedNode.label}</h3>
                  <span className="text-xs text-brand-400 uppercase tracking-wider font-semibold bg-brand-900/20 px-2 py-1 rounded">
                    {selectedNode.type}
                  </span>
                </div>

                {/* Bindings */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-2">
                    <FileJson className="h-3 w-3" /> Version Binding
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">Implementation</label>
                      <select className="w-full bg-slate-950 border border-slate-700 rounded text-sm px-2 py-1.5 focus:border-brand-500 outline-none text-slate-200">
                        <option>Production v2.1</option>
                        <option>Experimental v2.2-beta</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* SHARED: I/O Contract */}
            <div className="space-y-3 border-t border-slate-800 pt-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase">Input / Output Contract</h4>
              <div className="space-y-2">
                 <div className="bg-slate-800/50 p-2 rounded border border-slate-700">
                    <div className="text-xs font-mono text-emerald-400 mb-1">INPUTS</div>
                    {selectedNode.inputs.map(i => (
                      <div key={i} className="text-xs text-slate-300 ml-2">• {i}</div>
                    ))}
                 </div>
                 <div className="bg-slate-800/50 p-2 rounded border border-slate-700">
                    <div className="text-xs font-mono text-blue-400 mb-1">OUTPUTS</div>
                    {selectedNode.outputs.map(o => (
                      <div key={o} className="text-xs text-slate-300 ml-2">→ {o}</div>
                    ))}
                 </div>
              </div>
            </div>

            {/* SHARED: Actions */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button className="w-full bg-brand-600/20 hover:bg-brand-600/30 text-brand-400 py-2 rounded text-xs font-medium border border-brand-500/30 flex items-center justify-center gap-2">
                <Terminal className="h-3 w-3" /> View Logs
              </button>
              <div className="flex gap-2">
                <button className="flex-1 bg-slate-800 hover:bg-slate-700 py-2 rounded text-xs font-medium text-slate-300 border border-slate-700">
                  Inspect Code
                </button>
                <button className="flex-1 bg-rose-900/30 hover:bg-rose-900/50 py-2 rounded text-xs font-medium text-rose-400 border border-rose-900/50">
                  Detach
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 p-8 text-center">
            <Settings2 className="h-12 w-12 mb-4 opacity-50" />
            <p className="text-sm">Select a module on the canvas to configure properties, version bindings, and training optimization.</p>
          </div>
        )}
      </div>
    </div>
  );
};