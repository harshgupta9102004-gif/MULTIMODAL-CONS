import React, { useState } from 'react';
import { 
  UploadCloud, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Download, 
  RefreshCw, 
  Image as ImageIcon,
  Check,
  FileText
} from 'lucide-react';
import DisclaimerBanner from './DisclaimerBanner';

export default function SafetyAnalysis({ healthInfo }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // High-resolution construction sample image placeholder for testing
  const sampleImageUrl = "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=800&q=80";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const loadSampleImage = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(sampleImageUrl);
      const blob = await res.blob();
      const file = new File([blob], "sample_construction_site.jpg", { type: "image/jpeg" });
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } catch (err) {
      setError("Failed to load sample image. Please upload a local file.");
    } finally {
      setLoading(false);
    }
  };

  const runAnalysis = async () => {
    if (!selectedFile) {
      setError("Please select or upload a construction site photo first.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/safety-analysis", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ detail: "Analysis failed" }));
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

  const downloadJsonReport = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `safety_audit_report_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRiskBadge = (level) => {
    const map = {
      Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      High: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      Critical: 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse',
    };
    return map[level] || 'bg-slate-800 text-slate-300 border-slate-700';
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
          <span>Module 01</span>
          <span>•</span>
          <span>OSHA 1926 & IS 456 Standards</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Construction Site Safety & PPE Audit
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Automated multimodal computer vision inspecting personal protective equipment (PPE) compliance and detecting site hazards.
        </p>
      </div>

      <DisclaimerBanner />

      {/* Upload and Control Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Uploader Box */}
          <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-xl p-6 text-center transition-colors relative flex flex-col items-center justify-center min-h-[220px] bg-slate-950/40">
            {previewUrl ? (
              <div className="w-full flex flex-col items-center">
                <img
                  src={previewUrl}
                  alt="Site Preview"
                  className="max-h-52 w-auto object-contain rounded-lg border border-slate-800 shadow-md"
                />
                <p className="text-xs text-slate-400 mt-2 truncate max-w-xs font-mono">
                  {selectedFile?.name || "site_image.jpg"}
                </p>
              </div>
            ) : (
              <>
                <UploadCloud className="w-12 h-12 text-slate-500 mb-3" />
                <p className="text-sm font-medium text-slate-300">
                  Drag & drop site photo, or{' '}
                  <span className="text-amber-400 hover:underline cursor-pointer">browse</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WebP up to 15MB</p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {/* Action buttons & Info */}
          <div className="space-y-4">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Audited Safety Criteria:
              </div>
              <ul className="grid grid-cols-2 gap-2 text-slate-400">
                <li>• Hard Hats (ANSI Z89.1)</li>
                <li>• High-Vis Class 2/3 Vests</li>
                <li>• Steel-Toe Boots (ASTM F2413)</li>
                <li>• Guardrails & Fall Arrest</li>
                <li>• Scaffold Edge Protection</li>
                <li>• Electrical Cable Routing</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={runAnalysis}
                disabled={loading || !selectedFile}
                className="flex-1 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold px-5 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Image...</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    <span>Run Multimodal Audit</span>
                  </>
                )}
              </button>

              <button
                onClick={loadSampleImage}
                type="button"
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
                title="Load a pre-configured construction photo for instant demonstration"
              >
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span>Load Sample</span>
              </button>
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Safety Score</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white">
                  {result.safety_score !== undefined ? result.safety_score : '72'}
                </span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    (result.safety_score || 72) > 75 ? 'bg-emerald-500' : (result.safety_score || 72) > 50 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${result.safety_score || 72}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Overall Risk Level</div>
              <div className="mt-2">
                <span className={`inline-block px-3 py-1 text-sm font-bold rounded-lg border ${getRiskBadge(result.risk_level)}`}>
                  {result.risk_level || 'Medium'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {result.demo_mode ? 'Demonstration Mode' : 'Evaluated via Live Gemini 2.5'}
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Report Actions</div>
                <div className="text-xs text-slate-300 mt-1">Export structured audit data for site superintendents</div>
              </div>
              <button
                onClick={downloadJsonReport}
                className="mt-3 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-3 rounded-lg border border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download JSON Report</span>
              </button>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Executive Audit Summary
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* PPE Detection Checklist */}
          {result.ppe_compliance && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                PPE Compliance Checklist (OSHA / IS 456)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {result.ppe_compliance.map((item, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{item.item}</div>
                      <div className="text-[11px] text-slate-400 mt-1">Compliance: {item.compliance_rate}</div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        item.status === 'Compliant'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : item.status === 'Partial'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {item.status}
                      </span>
                      {item.status === 'Compliant' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hazards & Corrective Remedies */}
          {result.hazards && result.hazards.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Identified Site Hazards & Required Corrective Remedies
              </h3>
              <div className="space-y-3">
                {result.hazards.map((hz, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">{hz.hazard}</span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getRiskBadge(hz.severity)}`}>
                          {hz.severity}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        <span className="text-amber-400 font-medium">Remedy:</span> {hz.remedy}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Findings and Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Findings */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400" />
                Detailed Visual Findings
              </h3>
              <ul className="space-y-2.5">
                {result.findings?.map((f, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Mandatory Safety Directives
              </h3>
              <ul className="space-y-2.5">
                {result.recommendations?.map((r, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
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
