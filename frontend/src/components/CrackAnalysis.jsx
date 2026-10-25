import React, { useState } from 'react';
import { 
  UploadCloud, 
  Activity, 
  AlertTriangle, 
  Download, 
  RefreshCw, 
  Image as ImageIcon,
  CheckCircle2, 
  Wrench, 
  Layers, 
  Clock, 
  FileText 
} from 'lucide-react';
import DisclaimerBanner from './DisclaimerBanner';

export default function CrackAnalysis({ healthInfo }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Sample crack photo URL for instant testing
  const sampleCrackUrl = "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const loadSampleCrack = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(sampleCrackUrl);
      const blob = await res.blob();
      const file = new File([blob], "sample_concrete_crack.jpg", { type: "image/jpeg" });
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } catch (err) {
      setError("Failed to load sample image. Please upload a local image.");
    } finally {
      setLoading(false);
    }
  };

  const runAnalysis = async () => {
    if (!selectedFile) {
      setError("Please select or upload a wall or concrete surface photo first.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/crack-analysis", {
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
    a.download = `crack_diagnostics_report_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getUrgencyBadge = (urgency) => {
    const map = {
      Immediate: 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse',
      High: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      Moderate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      Routine: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    };
    return map[urgency] || 'bg-slate-800 text-slate-300 border-slate-700';
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
          <span>Module 02</span>
          <span>•</span>
          <span>Forensic Structural Engineering</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Crack Diagnostics & Structural Integrity Assessment
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Evaluate concrete, masonry, and beam surface cracks. Classify fracture morphology, width, root causes, and repair methods.
        </p>
      </div>

      <DisclaimerBanner />

      {/* Upload and Control Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Uploader Box */}
          <div className="border-2 border-dashed border-slate-700 hover:border-rose-500/60 rounded-xl p-6 text-center transition-colors relative flex flex-col items-center justify-center min-h-[220px] bg-slate-950/40">
            {previewUrl ? (
              <div className="w-full flex flex-col items-center">
                <img
                  src={previewUrl}
                  alt="Crack Surface Preview"
                  className="max-h-52 w-auto object-contain rounded-lg border border-slate-800 shadow-md"
                />
                <p className="text-xs text-slate-400 mt-2 truncate max-w-xs font-mono">
                  {selectedFile?.name || "crack_photo.jpg"}
                </p>
              </div>
            ) : (
              <>
                <UploadCloud className="w-12 h-12 text-slate-500 mb-3" />
                <p className="text-sm font-medium text-slate-300">
                  Drag & drop wall or concrete image, or{' '}
                  <span className="text-rose-400 hover:underline cursor-pointer">browse</span>
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
                <Activity className="w-4 h-4 text-rose-400" />
                Classification Categories:
              </div>
              <ul className="grid grid-cols-2 gap-2 text-slate-400">
                <li>• Hairline Shrinkage (&lt;0.3mm)</li>
                <li>• Differential Settlement</li>
                <li>• Structural Shear (45° angle)</li>
                <li>• Concrete Spalling & Rebar Exposure</li>
                <li>• Thermal Expansion Joints</li>
                <li>• Water Leaching & Efflorescence</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={runAnalysis}
                disabled={loading || !selectedFile}
                className="flex-1 bg-rose-500 hover:bg-rose-400 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Diagnosing Defect...</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    <span>Run Crack Diagnostics</span>
                  </>
                )}
              </button>

              <button
                onClick={loadSampleCrack}
                type="button"
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
                title="Load a sample cracked concrete wall for instant testing"
              >
                <ImageIcon className="w-4 h-4 text-rose-400" />
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
          {/* Top Diagnostics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Defect Classification</div>
              <div className="mt-2 text-base sm:text-lg font-bold text-white truncate">
                {result.defect_type || 'Structural Defect'}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Morphology match</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Estimated Crack Width</div>
              <div className="mt-2 text-xl font-bold text-amber-400">
                {result.estimated_width_mm || '2.0 - 4.0 mm'}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Threshold: 0.3mm (IS 456)</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Inspection Urgency</div>
              <div className="mt-2">
                <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg border ${getUrgencyBadge(result.urgency)}`}>
                  {result.urgency || 'High'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Action timeframe</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Diagnostic Report</div>
                <div className="text-xs text-slate-400 mt-1">Export structured forensics</div>
              </div>
              <button
                onClick={downloadJsonReport}
                className="mt-2 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-rose-400" />
                <span>Download Report</span>
              </button>
            </div>
          </div>

          {/* Diagnostic Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Diagnostic Engineering Summary
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* Root Causes & Recommended Repairs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Root Causes */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Identified Root Causes
              </h3>
              <ul className="space-y-2.5">
                {(result.root_causes || result.findings)?.map((cause, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Engineering Repairs */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Recommended Engineering Repairs
              </h3>
              <ul className="space-y-2.5">
                {(result.recommended_repairs || result.recommendations)?.map((repair, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{repair}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Engineering Observations */}
          {result.findings && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                Detailed Surface Observations & Forensic Notes
              </h3>
              <div className="space-y-2">
                {result.findings.map((f, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-slate-500 font-mono mt-0.5">#{idx + 1}</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
