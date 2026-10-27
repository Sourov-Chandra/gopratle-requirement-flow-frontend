import React from "react";
import { Check } from "lucide-react";

const STEPS = [
  { step: 1, label: "Event Basics", description: "Date, location & role" },
  { step: 2, label: "Category Details", description: "Scope & specifications" },
  { step: 3, label: "Requirements & Budget", description: "Logistics & compensation" },
  { step: 4, label: "Review & Submit", description: "Verify & publish" },
];

export default function ProgressIndicator({ currentStep, onStepClick }) {
  return (
    <div className="w-full mb-8">
      {/* Desktop/Tablet Steps */}
      <div className="hidden md:grid md:grid-cols-4 gap-3 relative">
        {STEPS.map((s, idx) => {
          const isCompleted = s.step < currentStep;
          const isCurrent = s.step === currentStep;
          const isClickable = isCompleted;

          return (
            <button
              type="button"
              key={s.step}
              onClick={() => isClickable && onStepClick(s.step)}
              disabled={!isClickable}
              className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                isCurrent
                  ? "bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20 shadow-sm"
                  : isCompleted
                  ? "bg-slate-50 border-slate-200 hover:border-slate-300 cursor-pointer"
                  : "bg-white border-slate-200 opacity-60 cursor-not-allowed"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors ${
                  isCompleted
                    ? "bg-emerald-600 text-white"
                    : isCurrent
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.step}
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    isCurrent
                      ? "text-indigo-600"
                      : isCompleted
                      ? "text-emerald-700"
                      : "text-slate-500"
                  }`}
                >
                  Step {s.step}
                </div>
                <div className="text-sm font-bold text-slate-900 truncate">
                  {s.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Steps Banner */}
      <div className="md:hidden bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-sm">
            {currentStep}
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">
              Step {currentStep} of 4
            </div>
            <div className="text-sm font-bold">
              {STEPS[currentStep - 1]?.label}
            </div>
          </div>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              className={`h-2 rounded-full transition-all ${
                stepNum === currentStep
                  ? "w-6 bg-indigo-400"
                  : stepNum < currentStep
                  ? "w-2 bg-emerald-400"
                  : "w-2 bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
