import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  RefreshCw, 
  Sparkles, 
  CloudSun, 
  Wind, 
  CloudRain, 
  Sun, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle,
  Lightbulb,
  FileText
} from 'lucide-react';
import DisclaimerBanner from './DisclaimerBanner';

export default function AIAssistant({ healthInfo }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      summary: 'BuildIntel Engineering Advisory',
      risk_level: 'Low',
      response: "Hello! I am your AI Construction Engineering Assistant. Ask me anything about OSHA / IS 456 codes, concrete curing protocols, structural inspection remedies, or adverse weather site safety protocols.",
      findings: [
        "Civil engineering standards require continuous moist curing of concrete for 7 to 14 days minimum.",
        "Scaffold operations must immediately halt when local wind gusts exceed 45 km/h (28 mph)."
      ],
      recommendations: [
        "Select a quick question below or type your specific site operational query."
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("Normal Weather");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const quickQuestions = [
    "What is the standard curing time for M25 concrete under IS 456?",
    "When must tower crane operations be halted during high winds?",
    "What are mandatory scaffold guardrail heights under OSHA 1926?",
    "How to prevent plastic shrinkage cracking during extreme heat (>38°C)?"
  ];

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg = {
      role: 'user',
      response: textToSend,
      weather: weatherCondition
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          context: `Current site weather condition: ${weatherCondition}`
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ detail: "Assistant failed" }));
        throw new Error(errData.detail || `Server error ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', ...data }]);
    } catch (err) {
      setError(err.message || "Failed to reach AI assistant service.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (level) => {
    const map = {
      Low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      High: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    };
    return map[level] || 'bg-slate-800 text-slate-300 border-slate-700';
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
          <span>Module 04</span>
          <span>•</span>
          <span>Conversational Decision Support</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          AI Construction Engineering Assistant & Weather Advisory
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Ask technical site questions, verify building codes, and receive weather-aware engineering protocols.
        </p>
      </div>

      <DisclaimerBanner />

      {/* Weather Condition Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <CloudSun className="w-4 h-4 text-amber-400" />
          <span>Active Site Weather Condition:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Normal Weather', icon: Sun },
            { label: 'High Wind (> 45 km/h)', icon: Wind },
            { label: 'Heavy Monsoon Rain', icon: CloudRain },
            { label: 'Extreme Heat (> 38°C)', icon: Sun },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = weatherCondition === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setWeatherCondition(item.label)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 min-h-[420px] flex flex-col justify-between">
        <div className="space-y-6 overflow-y-auto max-h-[520px] pr-2">
          {messages.map((msg, idx) => (
            <div key={idx} className="space-y-3">
              {msg.role === 'user' ? (
                /* User Bubble */
                <div className="flex items-start justify-end gap-3">
                  <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-xl text-sm shadow-md">
                    <p>{msg.response}</p>
                    {msg.weather && (
                      <div className="text-[10px] text-blue-200 mt-1 font-mono">
                        Context: {msg.weather}
                      </div>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              ) : (
                /* Assistant Card */
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex-1 bg-slate-950/80 border border-slate-800 rounded-2xl rounded-tl-sm p-5 space-y-4 shadow-md">
                    {msg.summary && (
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          {msg.summary}
                        </span>
                        {msg.risk_level && (
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getRiskBadge(msg.risk_level)}`}>
                            {msg.risk_level} Risk
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                      {msg.response}
                    </p>

                    {/* Findings */}
                    {msg.findings && msg.findings.length > 0 && (
                      <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3.5">
                        <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                          Key Technical Insights:
                        </div>
                        <ul className="space-y-1.5">
                          {msg.findings.map((f, fIdx) => (
                            <li key={fIdx} className="text-xs text-slate-400 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Recommendations */}
                    {msg.recommendations && msg.recommendations.length > 0 && (
                      <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-3.5">
                        <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Recommended Site Actions:
                        </div>
                        <ul className="space-y-1.5">
                          {msg.recommendations.map((r, rIdx) => (
                            <li key={rIdx} className="text-xs text-slate-400 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl rounded-tl-sm p-4 text-xs text-slate-400 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>Generating construction engineering response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-3 h-3 text-amber-400" />
            Quick Site Inquiries:
          </div>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, qIdx) => (
              <button
                key={qIdx}
                type="button"
                onClick={() => handleSend(q)}
                disabled={loading}
                className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-all text-left cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative pt-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about IS 456 concrete curing, OSHA scaffold standards, wind thresholds..."
            disabled={loading}
            className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 top-3.5 p-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
