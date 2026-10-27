import React from "react";
import {
  PERFORMER_TYPE_OPTIONS,
  AUDIENCE_VIBE_OPTIONS,
  AUDIENCE_AGE_OPTIONS,
} from "@/constants/form-options";
import {
  AlertCircle,
  Clock,
  Sparkles,
  CheckSquare,
  Square,
  Volume2,
} from "lucide-react";

export default function PerformerDetailsStep({
  step,
  register,
  errors,
  watch,
  setValue,
}) {
  const selectedType = watch("performerType");
  const soundProvided = watch("soundEquipmentProvidedByHost");
  const selectedAgeGroups = watch("audienceAgeGroups") || [];

  const toggleAgeGroup = (val) => {
    const current = [...selectedAgeGroups];
    const index = current.indexOf(val);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(val);
    }
    setValue("audienceAgeGroups", current, { shouldValidate: true });
  };

  if (step === 2) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="border-b border-slate-200 pb-5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Step 2: Performance Specifications
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Performer Act & Duration
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Specify the genre, performance category, and total stage time needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Performer Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Performer Type <span className="text-rose-500">*</span>
            </label>
            <select
              {...register("performerType")}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 bg-white ${
                errors.performerType
                  ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            >
              <option value="">Select Performer Type</option>
              {PERFORMER_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.performerType && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.performerType.message}
              </p>
            )}
          </div>

          {/* Custom Performer Type */}
          {selectedType === "OTHER" ? (
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Specify Performer Type <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Fire Dancer, Aerial Acrobat"
                {...register("performerTypeOther")}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                  errors.performerTypeOther
                    ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                    : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              />
              {errors.performerTypeOther && (
                <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.performerTypeOther.message}
                </p>
              )}
            </div>
          ) : (
            <div className="hidden md:block" />
          )}

          {/* Genre / Style */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Genre or Performance Style <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Acoustic Indie Pop, EDM & Bollywood, Sufi Fusion"
              {...register("genre")}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.genre
                  ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            />
            {errors.genre && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.genre.message}
              </p>
            )}
          </div>

          {/* Performance Duration */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Performance Duration (Minutes) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min={15}
                max={1440}
                placeholder="90"
                {...register("performanceDurationMinutes")}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                  errors.performanceDurationMinutes
                    ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                    : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              />
              <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
            {errors.performanceDurationMinutes && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.performanceDurationMinutes.message}
              </p>
            )}
            <p className="text-[11px] text-slate-500 mt-1">
              Minimum 15 minutes, maximum 1440 minutes (24 hours).
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Technical & Budget
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-200 pb-5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Step 3: Technical Setup & Budget
        </span>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Sound, Audience & Budget
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Indicate audio equipment responsibilities, audience demographics, and remuneration range.
        </p>
      </div>

      {/* Sound System Provided Toggle */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800">
              Sound & PA System Provided by Host?
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Select <strong>Yes</strong> if the venue/host provides speakers, mixer, and mics. Select <strong>No</strong> if the performer must bring their own sound gear.
            </div>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() =>
              setValue("soundEquipmentProvidedByHost", true, {
                shouldValidate: true,
              })
            }
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              soundProvided === true
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Yes, Host Provides
          </button>
          <button
            type="button"
            onClick={() =>
              setValue("soundEquipmentProvidedByHost", false, {
                shouldValidate: true,
              })
            }
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              soundProvided === false
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            No, Performer Brings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Audience Vibe */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Audience Vibe <span className="text-rose-500">*</span>
          </label>
          <select
            {...register("audienceVibe")}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100 bg-white"
          >
            <option value="">Select Audience Atmosphere</option>
            {AUDIENCE_VIBE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.audienceVibe && (
            <p className="mt-1 text-xs text-rose-600">
              {errors.audienceVibe.message}
            </p>
          )}
        </div>

        {/* Audience Age Groups (Multi-select) */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Target Audience Age Groups <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {AUDIENCE_AGE_OPTIONS.map((age) => {
              const isChecked = selectedAgeGroups.includes(age.value);
              return (
                <button
                  type="button"
                  key={age.value}
                  onClick={() => toggleAgeGroup(age.value)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${
                    isChecked
                      ? "border-indigo-500 bg-indigo-50/50 text-indigo-900 font-medium"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div className="text-indigo-600 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-3.5 h-3.5 fill-indigo-100" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                  <span className="text-xs">{age.label}</span>
                </button>
              );
            })}
          </div>
          {errors.audienceAgeGroups && (
            <p className="mt-1 text-xs text-rose-600">
              {errors.audienceAgeGroups.message}
            </p>
          )}
        </div>

        {/* Stage Requirements */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Stage or Technical Requirements <span className="text-xs font-normal text-slate-500">(Optional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Requires 16x12 ft stage, 2 cordless microphones, 1 monitor speaker..."
            {...register("stageRequirements")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* Budget Range */}
      <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200">
        <label className="block text-sm font-bold text-slate-900 mb-1">
          Performance Compensation Budget (INR) <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-slate-500 mb-4">
          Expected compensation range for the artist/act (₹ INR).
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
                placeholder="25000"
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
                placeholder="50000"
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
