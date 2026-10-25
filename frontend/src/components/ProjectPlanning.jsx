import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Calendar, 
  DollarSign, 
  MapPin, 
  RefreshCw, 
  Download, 
  TrendingUp, 
  Package, 
  CheckCircle2, 
  Clock, 
  FileText,
  AlertTriangle
} from 'lucide-react';
import DisclaimerBanner from './DisclaimerBanner';

export default function ProjectPlanning({ healthInfo }) {
  const [projectType, setProjectType] = useState("Commercial Complex");
  const [budget, setBudget] = useState(150);
  const [duration, setDuration] = useState(12);
  const [location, setLocation] = useState("Tier 1 Metro (Mumbai / Bengaluru / Delhi-NCR)");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleGeneratePlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/project-planning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_type: projectType,
          budget: parseFloat(budget),
          duration_months: parseInt(duration),
          location: location,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ detail: "Plan generation failed" }));
        throw new Error(errData.detail || `Server error ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Network request failed. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  };

  const downloadJsonPlan = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `project_plan_${projectType.toLowerCase().replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
          <span>Module 03</span>
          <span>•</span>
          <span>Engineering Project Management & Estimation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Construction Project Planning & Resource Forecasting
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Generate phased project timelines, capital expenditure cash flow, and primary raw material requirement metrics.
        </p>
      </div>

      <DisclaimerBanner />

      {/* Input Form Card */}
      <form onSubmit={handleGeneratePlan} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-400" />
          Project Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Project Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Structure / Project Type
            </label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="Commercial Complex">Commercial Complex</option>
              <option value="Residential High-Rise">Residential High-Rise (G+14)</option>
              <option value="Independent Villa / Residential">Independent Villa</option>
              <option value="Industrial Warehouse / Pre-Engineered Building">Industrial Warehouse (PEB)</option>
              <option value="Bridge / Highway Flyover">Bridge / Highway Infrastructure</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Total Budget (₹ Lakhs)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-500 text-sm font-semibold">₹</span>
              <input
                type="number"
                min="10"
                step="5"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                required
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">₹{budget} Lakhs ≈ ₹{(budget / 100).toFixed(2)} Cr</p>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Duration (Months)
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="number"
                min="3"
                max="60"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                required
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Target project completion timeframe</p>
          </div>

          {/* Location Tier */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Location Tier
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="Tier 1 Metro (Mumbai / Bengaluru / Delhi-NCR)">Tier 1 Metro (High labor & logistics cost)</option>
              <option value="Tier 2 City (Pune / Ahmedabad / Jaipur / Kochi)">Tier 2 City (Moderate logistics cost)</option>
              <option value="Tier 3 / Regional Development Area">Tier 3 / Semi-Urban</option>
            </select>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Estimated Monthly Burn Rate: <span className="font-mono font-bold text-amber-400">₹{(budget / Math.max(1, duration)).toFixed(2)} Lakhs/mo</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Formulating Plan...</span>
              </>
            ) : (
              <>
                <Layers className="w-4 h-4" />
                <span>Generate Construction Plan</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </form>

      {/* Results View */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Total CapEx Budget</div>
              <div className="mt-2 text-2xl font-extrabold text-white">
                ₹{result.total_budget || budget} <span className="text-sm font-normal text-slate-400">Lakhs</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">≈ ₹{((result.total_budget || budget) / 100).toFixed(2)} Crores INR</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Monthly Burn Rate</div>
              <div className="mt-2 text-2xl font-extrabold text-amber-400">
                ₹{result.monthly_burn_rate || (budget / duration).toFixed(2)} <span className="text-sm font-normal text-slate-400">L/mo</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Average cash outflow</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Execution Schedule</div>
              <div className="mt-2 text-2xl font-extrabold text-blue-400">
                {result.duration_months || duration} <span className="text-sm font-normal text-slate-400">Months</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">4 Critical milestones</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Plan Document</div>
                <div className="text-xs text-slate-400 mt-1">Export plan specification</div>
              </div>
              <button
                onClick={downloadJsonPlan}
                className="mt-2 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>Download Plan JSON</span>
              </button>
            </div>
          </div>

          {/* Plan Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Executive Project Formulation
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* Phased Milestone Schedule */}
          {result.phases && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Milestone Phase Schedule & Capital Allocation
              </h3>

              <div className="space-y-6">
                {result.phases.map((p, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-5 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{p.duration}</span>
                        <h4 className="text-base font-bold text-white mt-0.5">{p.phase}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold bg-slate-800 text-amber-300 px-2.5 py-1 rounded-lg border border-slate-700">
                          {p.percentage_budget || '25%'} Allocation
                        </span>
                        {p.budget_allocation && (
                          <span className="text-xs font-mono font-bold text-slate-300">
                            ₹{p.budget_allocation} Lakhs
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-xs text-slate-400 font-semibold mb-2">Key Engineering Tasks:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {p.key_tasks?.map((task, tIdx) => (
                          <div key={tIdx} className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Material Estimates Grid */}
          {result.material_estimates && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Primary Raw Material Requirement Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5">
                  <div className="text-xs text-slate-400 uppercase font-semibold">Grade 53/43 Cement</div>
                  <div className="mt-2 text-2xl font-mono font-extrabold text-white">
                    {result.material_estimates.cement_bags?.toLocaleString() || '2,775'}{' '}
                    <span className="text-xs font-normal text-slate-400">Bags</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Standard 50kg bags</p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5">
                  <div className="text-xs text-slate-400 uppercase font-semibold">TMT Reinforcing Steel</div>
                  <div className="mt-2 text-2xl font-mono font-extrabold text-amber-400">
                    {result.material_estimates.steel_metric_tonnes?.toLocaleString() || '63.0'}{' '}
                    <span className="text-xs font-normal text-slate-400">MT</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Fe 500D / Fe 550 grade</p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5">
                  <div className="text-xs text-slate-400 uppercase font-semibold">Coarse & Fine Aggregates</div>
                  <div className="mt-2 text-2xl font-mono font-extrabold text-blue-400">
                    {result.material_estimates.sand_aggregates_cft?.toLocaleString() || '7,200'}{' '}
                    <span className="text-xs font-normal text-slate-400">CFT</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">M-Sand & 20mm gravel</p>
                </div>
              </div>
            </div>
          )}

          {/* Findings and Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Schedule & Risk Vulnerabilities
              </h3>
              <ul className="space-y-2.5">
                {result.findings?.map((f, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Recommended Execution Strategies
              </h3>
              <ul className="space-y-2.5">
                {result.recommendations?.map((r, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
