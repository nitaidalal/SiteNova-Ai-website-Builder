import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiStar, FiSend, FiRefreshCw } from "react-icons/fi";
import WorkspaceTopbar from "../components/WorkspaceTopbar";

const starterPrompts = [
  "A minimal portfolio for a frontend developer with dark hero and project cards",
  "A modern SaaS landing page for an AI content tool with pricing and FAQ",
  "A bakery website with warm colors, product grid, and online order section",
  "A yoga studio website with calming visuals, class schedule, and testimonials",
];

const Generate = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedTone, setSelectedTone] = useState("modern");

  const promptLength = prompt.trim().length;
  const isPromptReady = promptLength >= 30;

  const helperMessage = useMemo(() => {
    if (promptLength === 0) {
      return <p  className="text-sm text-text-secondary">
        <span className="font-bold">🔶Tip:</span> Include sections, style, and target audience for best results
      </p>;
    }
    if (isPromptReady) {
      return "Great prompt. This is detailed enough to generate a strong first draft.";
    }
    return `Add ${30 - promptLength} more characters for a clearer generation.`;
  }, [isPromptReady, promptLength]);

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <WorkspaceTopbar title="Generate Website" />

      <main className="mx-auto  w-full max-w-5xl px-4 py-8 sm:px-6">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl p-2 bg-primary/15 text-primary">
              <FiStar className="text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold sm:text-2xl mb-1">
                Describe Your Website
              </h2>
              <p className="text-sm text-text-secondary">
                Tell us what you want, and SiteNova will generate the layout and
                content structure.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-3 sm:p-4">
            <textarea
              id="websitePrompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Example: Create a clean and premium website for a digital marketing agency with a hero section, services cards, client testimonials, pricing, and contact form. Use orange accents and smooth animations."
              className="h-56 w-full resize-none rounded-xl border border-border bg-bg/75 p-4 text-sm leading-6 text-text-primary outline-none ring-0 transition placeholder:text-text-secondary/70 focus:border-primary"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p
                className={`text-xs ${isPromptReady ? "text-emerald-500" : "text-text-secondary"}`}
              >
                {helperMessage}
              </p>
              {promptLength > 0 && (
                <p className="text-xs text-text-secondary">
                  {promptLength} chars
                </p>
              )}
            </div>

            <div className="mt-4 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setPrompt("")}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-bg px-4 py-2.5 text-sm font-medium text-text-primary transition hover:border-primary sm:w-auto"
              >
                <FiRefreshCw />
                Clear
              </button>
              <button
                type="button"
                disabled={!isPromptReady}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                <FiSend />
                Generate
              </button>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-text-primary">
              Quick Prompt Starters
            </p>
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPrompt(item)}
                  className="cursor-pointer rounded-full border border-border bg-bg px-3 py-1.5 text-xs text-text-secondary transition hover:border-primary hover:text-text-primary"
                >
                  {item.length > 62 ? `${item.slice(0, 62)}...` : item}
                </button>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Generate;
