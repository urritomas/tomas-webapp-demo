"use client";

import { useCallback, useMemo, useState, useEffect } from "react";

function CodeBlock({ title, code, language = "bash" }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (_) {}
  }, [code]);

  return (
    <div className="group relative my-4 w-full overflow-hidden rounded-xl border border-black/5 bg-zinc-50 shadow-sm transition dark:border-white/10 dark:bg-black/30">
      <div className="flex items-center justify-between border-b border-black/5 px-4 py-2 text-sm dark:border-white/10">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">{title}</span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-md border border-black/10 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-white/60 dark:border-white/20 dark:text-zinc-200 dark:hover:bg-white/10"
          aria-label="Copy code"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="relative max-h-105 overflow-auto p-4 text-sm leading-6">
        <code className="block whitespace-pre text-zinc-800 dark:text-zinc-200">
          {code}
        </code>
      </pre>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white/80 dark:to-black/80" />
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-3">
      <span className="text-sm text-zinc-700 dark:text-zinc-300">{label}</span>
      <span
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-300 transition peer-checked:bg-zinc-900 dark:bg-zinc-700 dark:peer-checked:bg-zinc-200"
      >
        <input
          type="checkbox"
          className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="pointer-events-none ml-1 inline-block h-4 w-4 rounded-full bg-white ring-1 ring-black/10 transition peer-checked:translate-x-5 dark:bg-black dark:ring-white/20" />
      </span>
    </label>
  );
}

function Playground() {
  const [rounded, setRounded] = useState(true);
  const [shadow, setShadow] = useState(true);
  const [padding, setPadding] = useState(true);
  const [accent, setAccent] = useState("indigo");

  const accentOptions = ["indigo", "emerald", "rose", "amber", "sky"]; 
  const ringByAccent = {
    indigo: "ring-indigo-500/20 hover:ring-indigo-500/40 dark:ring-indigo-400/20 dark:hover:ring-indigo-400/40",
    emerald: "ring-emerald-500/20 hover:ring-emerald-500/40 dark:ring-emerald-400/20 dark:hover:ring-emerald-400/40",
    rose: "ring-rose-500/20 hover:ring-rose-500/40 dark:ring-rose-400/20 dark:hover:ring-rose-400/40",
    amber: "ring-amber-500/20 hover:ring-amber-500/40 dark:ring-amber-400/20 dark:hover:ring-amber-400/40",
    sky: "ring-sky-500/20 hover:ring-sky-500/40 dark:ring-sky-400/20 dark:hover:ring-sky-400/40",
  };
  const badgeBgByAccent = {
    indigo: "bg-indigo-600 dark:bg-indigo-500",
    emerald: "bg-emerald-600 dark:bg-emerald-500",
    rose: "bg-rose-600 dark:bg-rose-500",
    amber: "bg-amber-600 dark:bg-amber-500",
    sky: "bg-sky-600 dark:bg-sky-500",
  };
  const chipByAccent = {
    indigo:
      "bg-indigo-50 text-indigo-800 ring-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-200 dark:ring-indigo-700/40",
    emerald:
      "bg-emerald-50 text-emerald-800 ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-200 dark:ring-emerald-700/40",
    rose:
      "bg-rose-50 text-rose-800 ring-rose-200 dark:bg-rose-950/30 dark:text-rose-200 dark:ring-rose-700/40",
    amber:
      "bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-200 dark:ring-amber-700/40",
    sky:
      "bg-sky-50 text-sky-800 ring-sky-200 dark:bg-sky-950/30 dark:text-sky-200 dark:ring-sky-700/40",
  };
  const swatchByAccent = {
    indigo: "from-indigo-400 to-indigo-600",
    emerald: "from-emerald-400 to-emerald-600",
    rose: "from-rose-400 to-rose-600",
    amber: "from-amber-400 to-amber-600",
    sky: "from-sky-400 to-sky-600",
  };

  const classes = useMemo(() => {
    return [
      "bg-white/70 dark:bg-white/5",
      "backdrop-blur",
      padding ? "p-8" : "p-3",
      rounded ? "rounded-2xl" : "rounded-none",
      shadow ? "shadow-xl shadow-black/10 dark:shadow-white/5" : "",
      "ring-1",
      ringByAccent[accent],
      "transition",
    ]
      .filter(Boolean)
      .join(" ");
  }, [rounded, shadow, padding, accent]);

  const badge = useMemo(
    () => `inline-flex items-center gap-2 rounded-full ${badgeBgByAccent[accent]} px-3 py-1 text-xs font-medium text-white`,
    [accent]
  );

  return (
    <div className="not-prose mt-6 rounded-xl border border-black/5 p-4 dark:border-white/10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <div className="grid gap-3">
            <Toggle label="Rounded corners" checked={rounded} onChange={setRounded} />
            <Toggle label="Large padding" checked={padding} onChange={setPadding} />
            <Toggle label="Shadow" checked={shadow} onChange={setShadow} />
          </div>
          <div className="grid gap-2">
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Accent color</span>
            <div className="flex flex-wrap gap-2">
              {accentOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => setAccent(c)}
                  className={`h-8 w-8 rounded-full ring-2 ring-inset transition hover:scale-105 ${
                    accent === c ? `outline-2 -outline-offset-2 outline-${c}-600` : ""
                  } bg-linear-to-br ${swatchByAccent[c]} ${ringByAccent[c].split(" ")[0]}`}
                  aria-label={`Set accent ${c}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className={classes}>
            <span className={badge}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M3.5 2A1.5 1.5 0 002 3.5v9A1.5 1.5 0 003.5 14H7v2.382a.5.5 0 00.854.353L11.59 14H16.5A1.5 1.5 0 0018 12.5v-9A1.5 1.5 0 0016.5 2h-13z" />
              </svg>
              Live preview
            </span>
            <h4 className="mt-4 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Tailwind Utility Playground
            </h4>
            <p className="mt-2 max-w-prose text-sm text-zinc-600 dark:text-zinc-400">
              Toggle utilities to see how small class changes affect the UI.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={`rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset ${chipByAccent[accent]}`}>
                {rounded ? "rounded-2xl" : "rounded-none"}
              </span>
              <span className={`rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset ${chipByAccent[accent]}`}>
                {padding ? "p-8" : "p-3"}
              </span>
              {shadow && (
                <span className={`rounded-lg px-2 py-1 text-xs font-medium ring-1 ring-inset ${chipByAccent[accent]}`}>
                  shadow-xl
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypographyPlayground() {
  const [size, setSize] = useState("base");
  const [leading, setLeading] = useState("normal");
  const [tracking, setTracking] = useState("normal");

  const textCls = useMemo(() => {
    const sizeMap = {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    };
    const leadingMap = {
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
    };
    const trackingMap = {
      tight: "tracking-tight",
      normal: "tracking-normal",
      wide: "tracking-wide",
    };
    return [
      sizeMap[size],
      leadingMap[leading],
      trackingMap[tracking],
      "text-zinc-800 dark:text-zinc-200",
    ]
      .filter(Boolean)
      .join(" ");
  }, [size, leading, tracking]);

  return (
    <div className="not-prose rounded-xl border border-black/5 p-4 dark:border-white/10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Size</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {["sm", "base", "lg", "xl"].map((v) => (
                <button key={v} onClick={() => setSize(v)} className={`rounded-md border px-3 py-1 text-sm transition hover:bg-white/60 dark:hover:bg-white/10 ${size === v ? "bg-white/80 dark:bg-black/30" : "bg-transparent"}`} aria-label={`Set size ${v}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Line height</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {["tight", "snug", "normal", "relaxed"].map((v) => (
                <button key={v} onClick={() => setLeading(v)} className={`rounded-md border px-3 py-1 text-sm transition hover:bg-white/60 dark:hover:bg-white/10 ${leading === v ? "bg-white/80 dark:bg-black/30" : "bg-transparent"}`} aria-label={`Set leading ${v}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Tracking</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {["tight", "normal", "wide"].map((v) => (
                <button key={v} onClick={() => setTracking(v)} className={`rounded-md border px-3 py-1 text-sm transition hover:bg-white/60 dark:hover:bg-white/10 ${tracking === v ? "bg-white/80 dark:bg-black/30" : "bg-transparent"}`} aria-label={`Set tracking ${v}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur dark:bg-white/5 dark:ring-white/10">
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Typography Preview</h4>
            <p className={`mt-3 ${textCls}`}>
              Tailwind’s typography utilities let you tune size, line-height, and letter spacing precisely.
            </p>
            <p className={`mt-2 ${textCls}`}>
              Combine with color and weight for polished, readable content across devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonsPlayground() {
  const [variant, setVariant] = useState("solid");
  const [accent, setAccent] = useState("indigo");
  const [rounded, setRounded] = useState("md");
  const [size, setSize] = useState("md");
  const [shadow, setShadow] = useState(true);

  const accents = ["indigo", "emerald", "rose", "amber", "sky"];
  const btnSolid = {
    indigo: "bg-indigo-600 hover:bg-indigo-500 text-white dark:bg-indigo-500 dark:hover:bg-indigo-400",
    emerald: "bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400",
    rose: "bg-rose-600 hover:bg-rose-500 text-white dark:bg-rose-500 dark:hover:bg-rose-400",
    amber: "bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-500 dark:hover:bg-amber-400",
    sky: "bg-sky-600 hover:bg-sky-500 text-white dark:bg-sky-500 dark:hover:bg-sky-400",
  };
  const btnOutline = {
    indigo: "border border-indigo-600 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-950/40",
    emerald: "border border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-950/40",
    rose: "border border-rose-600 text-rose-700 hover:bg-rose-50 dark:border-rose-400 dark:text-rose-300 dark:hover:bg-rose-950/40",
    amber: "border border-amber-600 text-amber-700 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-300 dark:hover:bg-amber-950/40",
    sky: "border border-sky-600 text-sky-700 hover:bg-sky-50 dark:border-sky-400 dark:text-sky-300 dark:hover:bg-sky-950/40",
  };
  const btnGhost = {
    indigo: "text-indigo-700 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-950/40",
    emerald: "text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950/40",
    rose: "text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/40",
    amber: "text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-950/40",
    sky: "text-sky-700 hover:bg-sky-50 dark:text-sky-300 dark:hover:bg-sky-950/40",
  };
  const sizeMap = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };
  const roundedMap = {
    none: "rounded-none",
    md: "rounded-md",
    full: "rounded-full",
  };

  const base = "inline-flex items-center gap-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const palette = variant === "solid" ? btnSolid[accent] : variant === "outline" ? btnOutline[accent] : btnGhost[accent];
  const cls = [base, palette, sizeMap[size], roundedMap[rounded], shadow ? "shadow-sm" : ""].filter(Boolean).join(" ");

  return (
    <div className="not-prose rounded-xl border border-black/5 p-4 dark:border-white/10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Variant</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {["solid", "outline", "ghost"].map((v) => (
                <button key={v} onClick={() => setVariant(v)} className={`rounded-md border px-3 py-1 text-sm transition hover:bg-white/60 dark:hover:bg-white/10 ${variant === v ? "bg-white/80 dark:bg-black/30" : "bg-transparent"}`} aria-label={`Set variant ${v}`}>{v}</button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Accent</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {accents.map((c) => (
                <button key={c} onClick={() => setAccent(c)} className={`h-8 w-8 rounded-full ring-2 ring-inset transition hover:scale-105 ${accent === c ? `outline-2 -outline-offset-2 outline-${c}-600` : ""} bg-linear-to-br from-${c}-400 to-${c}-600 ring-${c}-500/30`} aria-label={`Set accent ${c}`} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-sm text-zinc-700 dark:text-zinc-300">Rounded</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {["none", "md", "full"].map((v) => (
                  <button key={v} onClick={() => setRounded(v)} className={`rounded-md border px-3 py-1 text-sm transition hover:bg-white/60 dark:hover:bg-white/10 ${rounded === v ? "bg-white/80 dark:bg-black/30" : "bg-transparent"}`}>{v}</button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm text-zinc-700 dark:text-zinc-300">Size</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {["sm", "md", "lg"].map((v) => (
                  <button key={v} onClick={() => setSize(v)} className={`rounded-md border px-3 py-1 text-sm transition hover:bg-white/60 dark:hover:bg-white/10 ${size === v ? "bg-white/80 dark:bg-black/30" : "bg-transparent"}`}>{v}</button>
                ))}
              </div>
            </div>
          </div>
          <Toggle label="Shadow" checked={shadow} onChange={setShadow} />
        </div>
        <div className="md:col-span-2">
          <div className="rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur dark:bg-white/5 dark:ring-white/10">
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Buttons Preview</h4>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className={cls} aria-label="Primary action">Primary</button>
              <button className={cls} aria-label="Secondary action">Secondary</button>
              <button className={cls} aria-label="Another action">Another</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GridPlayground() {
  const [cols, setCols] = useState(3);
  const [gap, setGap] = useState(4);
  const [align, setAlign] = useState("center");
  const gridCols = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" };
  const gapMap = { 1: "gap-1", 2: "gap-2", 3: "gap-3", 4: "gap-4", 6: "gap-6", 8: "gap-8" };
  const alignMap = { start: "items-start", center: "items-center", end: "items-end" };

  const cls = ["grid", gridCols[cols], gapMap[gap], alignMap[align]].join(" ");

  return (
    <div className="not-prose rounded-xl border border-black/5 p-4 dark:border-white/10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Columns</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((v) => (
                <button key={v} onClick={() => setCols(v)} className={`rounded-md border px-3 py-1 text-sm transition hover:bg-white/60 dark:hover:bg-white/10 ${cols === v ? "bg-white/80 dark:bg-black/30" : "bg-transparent"}`}>{v}</button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Gap</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {[1, 2, 3, 4, 6, 8].map((v) => (
                <button key={v} onClick={() => setGap(v)} className={`rounded-md border px-3 py-1 text-sm transition hover:bg-white/60 dark:hover:bg-white/10 ${gap === v ? "bg-white/80 dark:bg-black/30" : "bg-transparent"}`}>{v}</button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Align</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {["start", "center", "end"].map((v) => (
                <button key={v} onClick={() => setAlign(v)} className={`rounded-md border px-3 py-1 text-sm transition hover:bg-white/60 dark:hover:bg-white/10 ${align === v ? "bg-white/80 dark:bg-black/30" : "bg-transparent"}`}>{v}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur dark:bg-white/5 dark:ring-white/10">
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Grid Preview</h4>
            <div className={`mt-4 ${cls}`}>
              {Array.from({ length: cols * 2 }).map((_, i) => (
                <div key={i} className="grid place-items-center rounded-lg border border-black/10 bg-white/70 p-4 text-xs text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-zinc-300">Box {i + 1}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormsPlayground() {
  const [rounded, setRounded] = useState(true);
  const [accent, setAccent] = useState("indigo");
  const [size, setSize] = useState("md");
  const accents = ["indigo", "emerald", "rose", "amber", "sky"];
  const ringFocus = {
    indigo: "focus:ring-indigo-500",
    emerald: "focus:ring-emerald-500",
    rose: "focus:ring-rose-500",
    amber: "focus:ring-amber-500",
    sky: "focus:ring-sky-500",
  };
  const sizeMap = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };
  const cls = [
    "w-full border border-black/10 bg-white/70 text-zinc-800 shadow-sm outline-none ring-1 ring-inset ring-black/10 transition placeholder:text-zinc-400 dark:border-white/10 dark:bg-white/10 dark:text-zinc-200 dark:ring-white/10",
    ringFocus[accent],
    rounded ? "rounded-md" : "rounded-none",
    sizeMap[size],
  ].join(" ");

  return (
    <div className="not-prose rounded-xl border border-black/5 p-4 dark:border-white/10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <Toggle label="Rounded" checked={rounded} onChange={setRounded} />
          <div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Accent</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {accents.map((c) => (
                <button key={c} onClick={() => setAccent(c)} className={`h-8 w-8 rounded-full ring-2 ring-inset transition hover:scale-105 ${accent === c ? `outline-2 -outline-offset-2 outline-${c}-600` : ""} bg-linear-to-br from-${c}-400 to-${c}-600 ring-${c}-500/30`} aria-label={`Set accent ${c}`} />
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Size</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {["sm", "md", "lg"].map((v) => (
                <button key={v} onClick={() => setSize(v)} className={`rounded-md border px-3 py-1 text-sm transition hover:bg-white/60 dark:hover:bg-white/10 ${size === v ? "bg-white/80 dark:bg-black/30" : "bg-transparent"}`}>{v}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-black/5 backdrop-blur dark:bg-white/5 dark:ring-white/10">
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Form Preview</h4>
            <div className="mt-4 grid gap-3">
              <input className={cls} placeholder="Your name" aria-label="Your name" />
              <input className={cls} placeholder="Email address" aria-label="Email address" />
              <textarea className={cls} rows={3} placeholder="Message" aria-label="Message" />
              <div className="flex gap-2">
                <button className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">Submit</button>
                <button className="rounded-md border border-black/10 px-4 py-2 text-sm text-zinc-700 transition hover:bg-white/60 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/10">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [fading, setFading] = useState(false);

  const applyTheme = useCallback((enableDark) => {
    setFading(true);
    const root = document.documentElement;
    root.classList.toggle("dark", enableDark);
    setIsDark(enableDark);
    setTimeout(() => setFading(false), 260);
  }, []);

  useEffect(() => {
    const hasClass = document.documentElement.classList.contains("dark");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const enableDark = hasClass || prefersDark;
    setIsDark(enableDark);
    document.documentElement.classList.toggle("dark", enableDark);
  }, []);
  const utilityExample = `<div class=\"flex items-center gap-3 rounded-xl border p-4 shadow-sm\">
  <span class=\"inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white\">✓</span>
  <p class=\"text-zinc-700\">Utilities combine to build polished UI quickly.</p>
</div>`;

  return (
    <div className={`relative min-h-screen bg-linear-to-b from-zinc-50 to-white font-sans dark:from-black dark:to-zinc-950 ${fading ? "theme-crossfade" : ""}`}>
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/60 dark:border-white/10 dark:bg-black/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20">
              <span className="text-sm font-bold">TW</span>
            </div>
            <span className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
              Tailwind CSS Playground
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <section className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-10 shadow-sm dark:border-white/10 dark:bg-black">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_400px_at_90%_-10%,rgba(99,102,241,0.15),transparent_60%)]" />
          <h1 className="max-w-3xl text-balance bg-linear-to-br from-zinc-900 to-zinc-700 bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-5xl dark:from-white dark:to-zinc-300">
            Tailwind CSS Utility Playground
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-zinc-600 md:text-xl dark:text-zinc-400">
            Experiment live with utilities and see instant UI changes. Switch light/dark mode and tweak shapes, shadows, and accents.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#playground" className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/60">
              Open Playground
            </a>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-8">
            <h2 id="playground" className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Getting Started with Tailwind</h2>
            <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
              Tailwind CSS is a utility-first framework that lets you build modern UIs by combining small, focused classes. No context switching—compose styles directly in your markup.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-emerald-50 to-emerald-50/30 p-6 shadow-sm dark:border-white/10 dark:from-emerald-950/20 dark:to-emerald-950/10">
              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10 10.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Utility Classes
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">Single-Purpose Classes</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Build UIs using focused, reusable utilities like <code className="rounded bg-black/10 px-2 py-1 text-xs text-emerald-700 dark:bg-white/10 dark:text-emerald-300">flex</code>, <code className="rounded bg-black/10 px-2 py-1 text-xs text-emerald-700 dark:bg-white/10 dark:text-emerald-300">gap-3</code>, <code className="rounded bg-black/10 px-2 py-1 text-xs text-emerald-700 dark:bg-white/10 dark:text-emerald-300">rounded-lg</code>.</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-blue-50 to-blue-50/30 p-6 shadow-sm dark:border-white/10 dark:from-blue-950/20 dark:to-blue-950/10">
              <div className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Responsive Design
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">Mobile-First Prefixes</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Apply utilities at breakpoints: <code className="rounded bg-black/10 px-2 py-1 text-xs text-blue-700 dark:bg-white/10 dark:text-blue-300">md:flex</code>, <code className="rounded bg-black/10 px-2 py-1 text-xs text-blue-700 dark:bg-white/10 dark:text-blue-300">lg:gap-6</code>. Build layouts that adapt effortlessly.</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-violet-50 to-violet-50/30 p-6 shadow-sm dark:border-white/10 dark:from-violet-950/20 dark:to-violet-950/10">
              <div className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                Dark Mode
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">Theme Variants</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Use the <code className="rounded bg-black/10 px-2 py-1 text-xs text-violet-700 dark:bg-white/10 dark:text-violet-300">dark:</code> prefix for automatic dark theme support without extra logic.</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-rose-50 to-rose-50/30 p-6 shadow-sm dark:border-white/10 dark:from-rose-950/20 dark:to-rose-950/10">
              <div className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                  <path fillRule="evenodd" d="M12 1H6a1 1 0 00-1 1v12a1 1 0 001 1h6a1 1 0 001-1V2a1 1 0 00-1-1zm-5.5 7a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                </svg>
                Composition
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">No Context Switching</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Build complex components by combining utilities. Stay in your HTML—markup and styles live together.</p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Common Utility Categories</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="flex gap-3">
                <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">Layout</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400"><code className="bg-black/5 px-1.5 py-0.5 dark:bg-white/10">flex</code>, <code className="bg-black/5 px-1.5 py-0.5 dark:bg-white/10">grid</code>, <code className="bg-black/5 px-1.5 py-0.5 dark:bg-white/10">gap-4</code>, <code className="bg-black/5 px-1.5 py-0.5 dark:bg-white/10">p-6</code></p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">Colors</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400"><code className="bg-black/5 px-1.5 py-0.5 dark:bg-white/10">bg-blue-500</code>, <code className="bg-black/5 px-1.5 py-0.5 dark:bg-white/10">text-red-700</code>, <code className="bg-black/5 px-1.5 py-0.5 dark:bg-white/10">border-gray-200</code></p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">Typography</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400"><code className="bg-black/5 px-1.5 py-0.5 dark:bg-white/10">text-lg</code>, <code className="bg-black/5 px-1.5 py-0.5 dark:bg-white/10">font-bold</code>, <code className="bg-black/5 px-1.5 py-0.5 dark:bg-white/10">leading-relaxed</code></p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">Effects & Spacing</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400"><code className="bg-black/5 px-1.5 py-0.5 dark:bg-white/10">rounded-lg</code>, <code className="bg-black/5 px-1.5 py-0.5 dark:bg-white/10">shadow-md</code>, <code className="bg-black/5 px-1.5 py-0.5 dark:bg-white/10">ring-1</code></p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">See it in Action</h3>
            <CodeBlock title="Before: Traditional CSS" code={`<div class="card">
  <h2>Hello World</h2>
  <p>A simple card</p>
</div>

<style>
.card {
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>`} language="html" />

            <CodeBlock title="After: Tailwind Utilities" code={utilityExample} language="html" />
          </div>
        </section>

        <article className="prose prose-zinc mt-12 max-w-none dark:prose-invert">
          <h2>Interactive Playgrounds</h2>
          <p>
            Experiment below with live controls. Toggle utilities and see how they affect the UI instantly.
          </p>
        </article>

        <Playground />

          <section className="prose prose-zinc mt-12 max-w-none dark:prose-invert">
            <h2>Typography</h2>
            <p>Tune type scale, line-height, and letter-spacing.</p>
          </section>
          <TypographyPlayground />

          <section className="prose prose-zinc mt-12 max-w-none dark:prose-invert">
            <h2>Buttons</h2>
            <p>Swap variants, accents, sizes, and radii.</p>
          </section>
          <ButtonsPlayground />

          <section className="prose prose-zinc mt-12 max-w-none dark:prose-invert">
            <h2>Grid & Spacing</h2>
            <p>Change columns, gaps, and alignment.</p>
          </section>
          <GridPlayground />

          <section className="prose prose-zinc mt-12 max-w-none dark:prose-invert">
            <h2>Forms</h2>
            <p>Focus rings, sizes, rounding, and shadows.</p>
          </section>
          <FormsPlayground />

        <section className="prose prose-zinc mt-12 max-w-none dark:prose-invert">
          <h2>Tips</h2>
          <ul>
            <li><strong>Extract patterns:</strong> When utilities repeat, extract with React components or <code>@apply</code> in CSS.</li>
            <li><strong>Design tokens:</strong> Use CSS variables (as in this template) and reference them in Tailwind via themes.</li>
            <li><strong>Ship less CSS:</strong> Tailwind tree-shakes unused styles automatically in production.</li>
          </ul>
        </section>

        {/** Activity guide removed to keep the page focused on the tutorial/playground. **/}
      </main>

      <footer className="border-t border-black/5 py-10 text-center text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">
        Urri Tomas 2025
      </footer>
    </div>
  );
}
