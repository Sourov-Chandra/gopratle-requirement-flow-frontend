import React from "react";
import {
  GUEST_COUNT_OPTIONS,
  PLANNING_SCOPE_OPTIONS,
} from "@/constants/form-options";
import { AlertCircle, IndianRupee, Sparkles, CheckSquare, Square } from "lucide-react";

export default function PlannerDetailsStep({
  step,
  register,
  errors,
  watch,
  setValue,
}) {
  const selectedScope = watch("planningScope") || [];
  const cateringNeeded = watch("cateringCoordinationNeeded");
  const decorNeeded = watch("decorLightingNeeded");

  const toggleScope = (val) => {
    const current = [...selectedScope];
    const index = current.indexOf(val);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(val);
    }
    setValue("planningScope", current, { shouldValidate: true });
  };

  if (step === 2) {
    return (
      <div className="space-y-7 animate-fadeIn">
        <div className="border-b border-slate-200 pb-5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Step 2: Planner Scope & Style
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Planning Scope & Guest Capacity
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Specify the scale of coordination required and your expected guest attendance.
          </p>
        </div>

        {/* Expected Guest Count */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Expected Guest Count <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {GUEST_COUNT_OPTIONS.map((opt) => {
              const isSelected = watch("guestCountRange") === opt.value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() =>
                    setValue("guestCountRange", opt.value, { shouldValidate: true })
                  }
                  className={`p-3.5 rounded-lg border text-center text-sm font-medium transition-all ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-1 ring-indigo-500 font-semibold"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          {errors.guestCountRange && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.guestCountRange.message}
            </p>
          )}
        </div>

        {/* Planning Scope (Multi-select) */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1">
            Required Planning Scope <span className="text-rose-500">*</span>
          </label>
          <p className="text-xs text-slate-500 mb-3">
            Select one or more levels of planning support you require.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PLANNING_SCOPE_OPTIONS.map((scope) => {
              const isChecked = selectedScope.includes(scope.value);
              return (
                <button
                  type="button"
                  key={scope.value}
                  onClick={() => toggleScope(scope.value)}
                  className={`flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all ${
                    isChecked
                      ? "border-indigo-500 bg-indigo-50/50 text-indigo-900 font-medium"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div className="mt-0.5 text-indigo-600 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 fill-indigo-100" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <span className="text-sm">{scope.label}</span>
                </button>
              );
            })}
          </div>
          {errors.planningScope && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.planningScope.message}
            </p>
          )}
        </div>

        {/* Theme Preferences */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Theme or Aesthetic Preferences <span className="text-xs font-normal text-slate-500">(Optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Minimalist contemporary with warm ambient illumination, blush pink floral motifs..."
            {...register("themePreferences")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100 transition-colors"
          />
          {errors.themePreferences && (
            <p className="mt-1 text-xs text-rose-600">
              {errors.themePreferences.message}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Step 3: Additional Requirements & Budget
  return (
    <div className="space-y-7 animate-fadeIn">
      <div className="border-b border-slate-200 pb-5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Step 3: Planner Deliverables & Budget
        </span>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Deliverables & Budget Estimates
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Specify core coordination deliverables and your projected budget in INR.
        </p>
      </div>

      {/* Deliverable Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Catering Coordination */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-slate-800">
              Catering Coordination
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Menu tasting, food vendor liaison & dining setup
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                setValue("cateringCoordinationNeeded", true, { shouldValidate: true })
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                cateringNeeded === true
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() =>
                setValue("cateringCoordinationNeeded", false, { shouldValidate: true })
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                cateringNeeded === false
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Decor and Lighting Design */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-slate-800">
              Decor & Lighting Design
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Stage styling, ambient fixtures & floral decor
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                setValue("decorLightingNeeded", true, { shouldValidate: true })
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                decorNeeded === true
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() =>
                setValue("decorLightingNeeded", false, { shouldValidate: true })
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                decorNeeded === false
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>

      {/* Budget Range */}
      <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200">
        <label className="block text-sm font-bold text-slate-900 mb-1">
          Estimated Planner Budget (INR) <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-slate-500 mb-4">
          Provide your expected budget range for planning services (₹ INR).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Minimum Budget (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-semibold text-sm">
                ₹
              </span>
              <input
                type="number"
                min={0}
                placeholder="50000"
                {...register("budgetMin")}
                className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100 bg-white"
              />
            </div>
            {errors.budgetMin && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.budgetMin.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Maximum Budget (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-semibold text-sm">
                ₹
              </span>
              <input
                type="number"
                min={0}
                placeholder="150000"
                {...register("budgetMax")}
                className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100 bg-white"
              />
            </div>
            {errors.budgetMax && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.budgetMax.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
