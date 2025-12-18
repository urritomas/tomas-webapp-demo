"use client";

import { useCallback, useMemo, useState } from "react";

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

export default function Home() {
  const installCmd = `# 1) Install Tailwind and PostCSS plugin
npm install tailwindcss @tailwindcss/postcss postcss autoprefixer --save-dev

# 2) Add the plugin to PostCSS (postcss.config.mjs)
export default { plugins: { "@tailwindcss/postcss": {} } }

# 3) Import Tailwind in your global CSS (app/globals.css)
@import "tailwindcss";

# 4) Use the classes in your components
export default function Button(){
  return <button className=\"px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500\">Click</button>
}`;

  const nextSpecific = `// Next.js (App Router) quick wiring
// app/layout.js
import "./globals.css";
export default function RootLayout({ children }) {
  return <html lang=\"en\"><body>{children}</body></html>;
}

// app/page.js
export default function Page(){
  return (
    <main className=\"p-10 max-w-3xl mx-auto\">Hello Tailwind 👋</main>
  );
}`;

  const utilityExample = `<div class=\"flex items-center gap-3 rounded-xl border p-4 shadow-sm\">
  <span class=\"inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white\">✓</span>
  <p class=\"text-zinc-700\">Utilities combine to build polished UI quickly.</p>
</div>`;

  return (
    <div className="relative min-h-screen bg-linear-to-b from-zinc-50 to-white font-sans dark:from-black dark:to-zinc-950">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/60 dark:border-white/10 dark:bg-black/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20">
              <span className="text-sm font-bold">TW</span>
            </div>
            <span className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
              How to Use Tailwind CSS
            </span>
          </div>
          <nav className="hidden gap-6 text-sm font-medium text-zinc-700 dark:text-zinc-300 md:flex">
            <a className="hover:text-zinc-900 dark:hover:text-white" href="#install">Install</a>
            <a className="hover:text-zinc-900 dark:hover:text-white" href="#configure">Configure</a>
            <a className="hover:text-zinc-900 dark:hover:text-white" href="#use">Use</a>
            <a className="hover:text-zinc-900 dark:hover:text-white" href="#playground">Playground</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <section className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-10 shadow-sm dark:border-white/10 dark:bg-black">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_400px_at_90%_-10%,rgba(99,102,241,0.15),transparent_60%)]" />
          <h1 className="max-w-3xl text-balance bg-linear-to-br from-zinc-900 to-zinc-700 bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-5xl dark:from-white dark:to-zinc-300">
            How to Use Tailwind CSS
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-zinc-600 md:text-xl dark:text-zinc-400">
            Learn the modern, utility-first workflow to build beautiful, responsive UIs without leaving your HTML.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#install" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500">
              Start Installing
            </a>
            <a href="#playground" className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/60">
              Open Playground
            </a>
          </div>
        </section>

        <article className="prose prose-zinc mt-12 max-w-none dark:prose-invert">
          <h2 id="install">1) Install</h2>
          <p>
            Tailwind works with any build tool. In Next.js, install Tailwind plus the official PostCSS plugin. This project already ships with the correct setup, but here’s the quick recipe.
          </p>
          <CodeBlock title="Install + wire up" code={installCmd} />

          <h2 id="configure">2) Configure</h2>
          <p>
            Tailwind v4 is mostly zero-config. Ensure your global CSS imports Tailwind and PostCSS runs the plugin. Optionally add themes, fonts, or CSS variables like in this template.
          </p>
          <CodeBlock title="Next.js files" code={nextSpecific} language="js" />

          <h2 id="use">3) Use utilities</h2>
          <p>
            Compose tiny utility classes to design components quickly. Here’s a small example using layout, color, and radius utilities.
          </p>
          <CodeBlock title="Utility example" code={utilityExample} language="html" />

          <ul>
            <li><strong>Layout:</strong> <code>flex</code>, <code>grid</code>, <code>gap-*</code>, <code>container</code>, <code>p-*</code>, <code>m-*</code></li>
            <li><strong>Styling:</strong> <code>bg-*</code>, <code>text-*</code>, <code>rounded-*</code>, <code>shadow-*</code>, <code>ring-*</code></li>
            <li><strong>State:</strong> <code>hover:</code>, <code>focus:</code>, <code>active:</code>, <code>disabled:</code></li>
            <li><strong>Responsive:</strong> <code>sm:</code>, <code>md:</code>, <code>lg:</code>, <code>xl:</code>, <code>2xl:</code></li>
            <li><strong>Dark mode:</strong> <code>dark:</code> variants, or rely on system preference.</li>
          </ul>

          <h2 id="playground">4) Playground</h2>
          <p>
            Try the live playground below. Toggle utilities and colors to see how class names map directly to design decisions.
          </p>
        </article>

        <Playground />

        <section className="prose prose-zinc mt-12 max-w-none dark:prose-invert">
          <h2>Tips</h2>
          <ul>
            <li><strong>Extract patterns:</strong> When utilities repeat, extract with React components or <code>@apply</code> in CSS.</li>
            <li><strong>Design tokens:</strong> Use CSS variables (as in this template) and reference them in Tailwind via themes.</li>
            <li><strong>Ship less CSS:</strong> Tailwind tree-shakes unused styles automatically in production.</li>
          </ul>
        </section>

        <section className="prose prose-zinc mt-12 max-w-none dark:prose-invert">
          <h2>Activity Guide: Build & Deploy</h2>
          <p>
            Below is the complete step-by-step guide you provided. It’s embedded here for easy reference and matches your classroom activity. Follow each step to create, run, and deploy your Next.js app.
          </p>

          <details className="rounded-xl border border-black/5 bg-white p-4 shadow-sm open:p-5 dark:border-white/10 dark:bg-black">
            <summary className="cursor-pointer list-none">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white">Guide</span>
              <span className="ml-2 text-sm text-zinc-700 dark:text-zinc-300">Click to expand the complete activity instructions</span>
            </summary>

            <h3 className="mt-6">1. Create a GitHub Repository</h3>
            <ul>
              <li>Open <a href="https://desktop.github.com/" target="_blank" rel="noreferrer">GitHub Desktop</a></li>
              <li>Sign in to your account</li>
              <li>Create a new repository named: <strong>lastname-webapp-demo</strong></li>
              <li>Publish the repository to GitHub</li>
            </ul>

            <h3>2. Open the Project in VS Code</h3>
            <ul>
              <li>In GitHub Desktop → click <strong>Open in Visual Studio Code</strong></li>
              <li>In VS Code → right-click the project panel → <strong>Open in Integrated Terminal</strong></li>
            </ul>

            <h3>3. Verify Installed Tools</h3>
            <p>Run these commands and ensure you see version numbers:</p>
            {/** use existing reusable CodeBlock **/}
            <CodeBlock title="Check versions" code={`node -v\nnpm -v\ngit -v`} />

            <h3>4. Download the Activity Materials</h3>
            <p>Get the starter files from:</p>
            <p>
              <a href="https://github.com/clydeatmcm/IT103/tree/main/M1/FA4/webapp1" target="_blank" rel="noreferrer">
                https://github.com/clydeatmcm/IT103/tree/main/M1/FA4/webapp1
              </a>
            </p>

            <h3>5. Create a New Next.js Project</h3>
            <p>Run this command inside your project folder:</p>
            <CodeBlock title="Create Next.js app" code={`npx create-next-app@latest .`} />
            <p>Follow the configuration settings provided in the activity materials.</p>

            <h3>6. Add Your Boilerplate Page</h3>
            <ul>
              <li>Copy the provided <code>page.js</code> code from the activity material into <strong>app/page.js</strong></li>
              <li>Overwrite the existing file</li>
            </ul>

            <h3>7. Run the Web App Locally</h3>
            <p>Start your development server:</p>
            <CodeBlock title="Run dev server" code={`npm run dev`} />
            <p>Your project should open at: <strong>http://localhost:3000</strong></p>

            <h3>8. Push Your Updates to GitHub</h3>
            <ul>
              <li>In GitHub Desktop: <strong>Commit</strong> your changes</li>
              <li>Click <strong>Push</strong> to your remote repository</li>
            </ul>

            <h3>9. Deploy to Vercel</h3>
            <ul>
              <li>Go to <a href="https://vercel.com" target="_blank" rel="noreferrer">vercel.com</a></li>
              <li>Sign in using GitHub</li>
              <li>Create a New Project</li>
              <li>Select your repository</li>
              <li>Deploy!</li>
            </ul>

            <p className="mt-6">🎉 You’re done! Your first web app is deployed using Node.js + Next.js + Vercel.</p>
          </details>
        </section>
      </main>

      <footer className="border-t border-black/5 py-10 text-center text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400">
        Built with Next.js + Tailwind CSS. Have fun building!
      </footer>
    </div>
  );
}
