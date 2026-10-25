import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import SafetyAnalysis from './components/SafetyAnalysis';
import CrackAnalysis from './components/CrackAnalysis';
import ProjectPlanning from './components/ProjectPlanning';
import AIAssistant from './components/AIAssistant';
import { ArrowLeft, HardHat, Shield, Activity, Building2, Bot } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [healthInfo, setHealthInfo] = useState({
    status: 'checking',
    gemini_api_key_configured: false,
    mode: 'demonstration'
  });

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const data = await res.json();
          setHealthInfo(data);
        }
      } catch (err) {
        console.warn('Backend currently unreachable or booting up:', err);
      }
    };
    checkBackend();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        healthInfo={healthInfo} 
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button if not on dashboard */}
        {activeTab !== 'dashboard' && (
          <div className="mb-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        )}

        {/* Tab Views */}
        {activeTab === 'dashboard' && (
          <DashboardOverview 
            setActiveTab={setActiveTab} 
            healthInfo={healthInfo} 
          />
        )}

        {activeTab === 'safety' && (
          <SafetyAnalysis healthInfo={healthInfo} />
        )}

        {activeTab === 'crack' && (
          <CrackAnalysis healthInfo={healthInfo} />
        )}

        {activeTab === 'planning' && (
          <ProjectPlanning healthInfo={healthInfo} />
        )}

        {activeTab === 'assistant' && (
          <AIAssistant healthInfo={healthInfo} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2 text-slate-400 font-medium">
            <HardHat className="w-4 h-4 text-amber-400" />
            <span>Multimodal Construction Intelligence Platform</span>
            <span>•</span>
            <span>Skill Wallet Capstone Project</span>
          </div>
          <p className="max-w-2xl mx-auto text-slate-500 text-[11px] leading-relaxed">
            Engineered with React 19, Tailwind CSS, FastAPI, and Google Gemini Multimodal Generative AI. 
            All structural and hazard classifications are preliminary computerized evaluations. Always consult licensed structural engineers (IS 456 / OSHA / NBC).
          </p>
          <div className="pt-2 text-[10px] text-slate-600 font-mono">
            FastAPI Backend • Vite React Frontend • Multi-Service Architecture
          </div>
        </div>
      </footer>
    </div>
  );
}
