import React, { useState } from 'react';
import { NavSection } from './types';
import { NAV_ITEMS } from './constants';
import { WorkflowBuilder } from './components/WorkflowBuilder';
import { EvaluationGate } from './components/EvaluationGate';
import { DeploymentHub } from './components/DeploymentHub';
import { ProjectCenter } from './components/ProjectCenter';
import { ModelStudio } from './components/ModelStudio';
import { PromptStudio } from './components/PromptStudio';
import { DataFactory } from './components/DataFactory';
import { Database } from 'lucide-react';

// Placeholder components for sections not fully implemented in the demo
const PlaceholderComponent: React.FC<{ title: string; icon: React.ElementType }> = ({ title, icon: Icon }) => (
  <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center text-slate-500">
    <Icon className="h-24 w-24 mb-6 opacity-20" />
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-sm">This module is under construction.</p>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavSection>(NavSection.PROJECT_CENTER);

  const renderContent = () => {
    switch (activeTab) {
      case NavSection.PROJECT_CENTER:
        return <ProjectCenter />;
      case NavSection.WORKFLOW_BUILDER:
        return <WorkflowBuilder />;
      case NavSection.PROMPT_STUDIO:
        return <PromptStudio />;
      case NavSection.MODEL_STUDIO:
        return <ModelStudio />;
      case NavSection.EVALUATION_GATE:
        return <EvaluationGate />;
      case NavSection.DEPLOYMENT_HUB:
        return <DeploymentHub />;
      case NavSection.DATA_FACTORY:
        return <DataFactory />;
      default:
        return <ProjectCenter />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-200">
      
      {/* SIDEBAR */}
      <nav className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between z-20">
        <div>
          {/* Logo / Brand */}
          <div className="h-16 flex items-center px-6 border-b border-slate-800">
            <div className="h-8 w-8 bg-brand-600 rounded-lg mr-3 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              G
            </div>
            <div>
              <h1 className="font-bold text-white tracking-wide">GAASD</h1>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Core Platform</span>
            </div>
          </div>

          {/* Nav Items */}
          <div className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                <item.icon className={`h-4 w-4 ${activeTab === item.id ? 'text-white' : 'text-slate-500'}`} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* User / Settings Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-brand-500"></div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Xu Qing</p>
              <p className="text-xs text-slate-500 truncate">Lead Researcher</p>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative overflow-hidden">
        {renderContent()}
      </main>

    </div>
  );
};

export default App;
