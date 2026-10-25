import React from 'react';
import { 
  ShieldAlert, 
  Search, 
  Layers, 
  Bot, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck, 
  Hammer, 
  Cpu, 
  Zap,
  TrendingUp
} from 'lucide-react';

export default function DashboardOverview({ setActiveTab, healthInfo }) {
  const cards = [
    {
      id: 'safety',
      title: 'Construction Safety & PPE Audit',
      badge: 'Multimodal Vision',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      icon: ShieldAlert,
      iconBg: 'from-amber-500 to-amber-600',
      description: 'Upload construction site photos to evaluate PPE compliance (hard hats, high-vis vests, steel-toe boots) and detect high-risk hazards under OSHA and IS 456 standards.',
      features: ['OSHA 1926 & IS 456 Compliance', 'Visual Hazard Severity Scoring', 'Downloadable JSON Safety Report'],
      buttonText: 'Start Safety Audit',
      accentColor: 'hover:border-amber-500/50'
    },
    {
      id: 'crack',
      title: 'Crack Diagnostics & Structural Integrity',
      badge: 'Defect Classifier',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      icon: Search,
      iconBg: 'from-rose-500 to-rose-600',
      description: 'Analyze concrete and masonry wall fractures. Classifies defect type (hairline, settlement, structural shear, spalling) with estimated crack width (mm) and engineering remedies.',
      features: ['Defect Type Classification', 'Estimated Crack Width (mm)', 'Epoxy Injection & Grouting Remedies'],
      buttonText: 'Inspect Concrete Defects',
      accentColor: 'hover:border-rose-500/50'
    },
    {
      id: 'planning',
      title: 'Project Planning & Material Estimation',
      badge: 'Planning Engine',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: Layers,
      iconBg: 'from-blue-500 to-blue-600',
      description: 'Enter project parameters (structure type, budget, and duration) to generate automated 4-phase milestone schedules, cash-flow burn rates, and cement/steel material forecasts.',
      features: ['Milestone Phase Schedule', 'Monthly Cash-Flow Burn Rate', 'Cement & Steel Quantity Estimates'],
      buttonText: 'Generate Construction Plan',
      accentColor: 'hover:border-blue-500/50'
    },
    {
      id: 'assistant',
      title: 'AI Construction Engineering Assistant',
      badge: 'Interactive Advisory',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: Bot,
      iconBg: 'from-emerald-500 to-emerald-600',
      description: 'Interactive expert assistant providing practical guidance on concrete curing protocols, weather hazard mitigation (high winds, rain), crane safety, and building code compliance.',
      features: ['Concrete Curing Protocols', 'Weather-Aware Hazard Advisory', 'IS 456 & ACI Standard References'],
      buttonText: 'Consult Site Assistant',
      accentColor: 'hover:border-emerald-500/50'
    }
  ];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 mb-4">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>AI-Powered Decision-Support Platform</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Multimodal Construction <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">Intelligence Platform</span>
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Assist site engineers, project managers, and safety auditors with real-time visual safety inspections, structural crack diagnostics, automated project scheduling, and conversational engineering advisory.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 pt-6">
            <div>
              <div className="text-xs text-slate-400">Analysis Modality</div>
              <div className="text-base font-bold text-white mt-0.5 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-amber-400" />
                Vision + Text LLM
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Engineering Standards</div>
              <div className="text-base font-bold text-white mt-0.5 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-blue-400" />
                OSHA & IS 456
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">Data Contract</div>
              <div className="text-base font-bold text-white mt-0.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Strict JSON Output
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400">System Mode</div>
              <div className="text-base font-bold text-white mt-0.5 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-orange-400" />
                {healthInfo?.gemini_api_key_configured ? 'Live Gemini AI' : 'High-Fidelity Demo'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Core Intelligence Modules</h2>
            <p className="text-xs text-slate-400 mt-1">Select an engineering module to begin automated analysis</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setActiveTab(card.id)}
                className={`group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800 ${card.accentColor} rounded-2xl p-6 sm:p-7 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${card.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {card.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {card.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                    {card.buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Module #{cards.indexOf(card) + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
