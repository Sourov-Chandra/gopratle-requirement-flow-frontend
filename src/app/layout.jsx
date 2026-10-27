import "./globals.css";
import { Toaster } from "sonner";
import { Sparkles, Layers, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "EventTalentBridge — Event Requirement Posting Flow",
  description:
    "Post event requirements for planners, performers, and specialized on-ground crew.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-100">
        <Toaster position="top-right" richColors />

        {/* Global Navigation Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-300">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                  EventTalentBridge
                </span>
                <span className="text-[11px] font-semibold text-slate-500 block -mt-0.5">
                  Requirement Flow Portal
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live API Connected
              </span>
            </div>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 EventTalentBridge. All rights reserved.</span>
            <span className="text-slate-400">
              Built with Next.js (JS) • Tailwind CSS • Express • Native MongoDB Driver
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
