import { useEffect, useState } from "react";
import { getModels } from "../services/Service";

const LOCAL_KEY = "neon.selectedModel";

// Custom friendly labels
const overrideLabels = {
  amitav: "Amitav Model Algo — Best Answer",
};

// Model descriptions
function modelDescription(id) {
  if (!id) return "";
  if (id === "amitav")
    return "Amitav’s ensemble chooses the highest-quality, most accurate answer.";
  if (id.startsWith("deepseek/"))
    return "DeepSeek reasoning engine — excels at logic & detailed breakdowns.";
  if (id.startsWith("google/"))
    return "Google Gemini — strong creativity & multimodal intelligence.";
  if (id.startsWith("openai/"))
    return "OpenAI — balanced reasoning, creativity, and reliability.";
  if (id.startsWith("meta/"))
    return "Meta AI — fast & efficient responses.";
  return "General model — adapts to queries efficiently.";
}

// Pretty label generator
function prettyLabelFromId(id) {
  if (!id || typeof id !== "string") return String(id ?? "");

  if (overrideLabels[id]) return overrideLabels[id];

  const vendorMap = {
    deepseek: "DeepSeek",
    google: "Google",
    openai: "OpenAI",
    meta: "Meta",
    xai: "xAI",
  };

  let vendor = "";
  let name = id;

  const slashIdx = id.indexOf("/");
  if (slashIdx !== -1) {
    vendor = id.slice(0, slashIdx);
    name = id.slice(slashIdx + 1);
  }

  if (vendor && name.startsWith(vendor + "-"))
    name = name.slice(vendor.length + 1);

  name = name
    .replace(/:(\w+)$/i, (_, tag) => ` (${tag})`)
    .replace(/[_-]+/g, " ")
    .replace(/\bgpt\b/gi, "GPT")
    .replace(/\br1\b/gi, "R1")
    .replace(/\bexp\b/gi, "Experimental")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const vendorNice =
    vendorMap[vendor] || (vendor ? vendor.charAt(0).toUpperCase() + vendor.slice(1) : "");
  return vendorNice ? `${vendorNice} — ${name}` : name;
}

export default function Sidebar({ model, onChange }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getModels();

        const raw = data?.data?.data?.models || [];
        const list = raw.map((item) => {
          if (typeof item === "string") {
            return { id: item, label: overrideLabels[item] ?? prettyLabelFromId(item) };
          }
          const id = item.id ?? item.value ?? item.model ?? "";
          const label =
            item.name ?? item.label ?? overrideLabels[id] ?? prettyLabelFromId(id);
          return { id, label };
        });

        setModels(list);

        const backendDefault = data?.default || "";
        const local = localStorage.getItem(LOCAL_KEY);
        const initial = local || backendDefault || (list[0]?.id ?? "gpt-4o-mini");

        if (mounted) onChange(initial);
      } catch (e) {
        console.error(e);
        setError("Unable to load models. Using default.");
        onChange(localStorage.getItem(LOCAL_KEY) || "gpt-4o-mini");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [onChange]);

  function handleChange(e) {
    const value = e.target.value;
    localStorage.setItem(LOCAL_KEY, value);
    onChange(value);
  }

  return (
    <aside className="w-full md:w-72 glass neon-border rounded-2xl p-4 h-full flex flex-col gap-4 text-white">
      {/* Brand */}
      <div className="text-xl font-bold tracking-wide text-neon-cyan">
        Amitav's <span className="text-neon-pink">AI</span>
      </div>

      {/* Header */}
      <div className="text-sm font-semibold tracking-wide flex items-center justify-between">
        <span className="text-white">Select Model</span>
        <span className="text-[10px] text-white">
          {loading ? "Loading…" : models.length ? `${models.length} available` : "No models"}
        </span>
      </div>

      {error && <div className="text-xs text-red-300">{error}</div>}

      {/* Model dropdown */}
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none rounded-xl animate-pulse-neon"></div>

        <select
          className="w-full bg-neutral-900 border border-white/15 text-white rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan/60 appearance-none"
          value={model}
          onChange={handleChange}
        >
          {models.length === 0 && (
            <option value={model || "gpt-4o-mini"}>{model || "gpt-4o-mini"} (default)</option>
          )}
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/80">
          ▾
        </span>

        {/* 🔥 Best answer badge */}
        {model === "amitav" && (
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-black/60 px-3 py-1 text-[10px] text-neon-cyan shadow-neon">
            <span className="h-2 w-2 rounded-full bg-neon-pink animate-pulse"></span>
            Best Answer Mode
          </div>
        )}

        {/* Description */}
        {model && (
          <p className="mt-2 text-[11px] text-white/80">
            {modelDescription(model)}
          </p>
        )}
      </div>

      {/* Quote */}
      <div className="mt-auto text-xs text-neon-cyan italic opacity-90">
        “Imagination is the processor. Curiosity is the GPU.”
        <div className="text-[10px] text-neon-pink mt-1 text-right">— Amitav's AI 💠</div>
      </div>
    </aside>
  );
}
