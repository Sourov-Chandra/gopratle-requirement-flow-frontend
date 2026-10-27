import React from "react";
import {
  EVENT_TYPE_OPTIONS,
  GUEST_COUNT_OPTIONS,
  PLANNING_SCOPE_OPTIONS,
  PERFORMER_TYPE_OPTIONS,
  AUDIENCE_VIBE_OPTIONS,
  AUDIENCE_AGE_OPTIONS,
  CREW_SPECIALIZATION_OPTIONS,
  CREW_RATE_UNITS,
} from "@/constants/form-options";
import {
  Edit3,
  Calendar,
  MapPin,
  Building,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";

export default function ReviewStep({
  formData,
  onEditStep,
  onSubmit,
  isSubmitting,
  submitError,
}) {
  const { category } = formData;

  const eventTypeLabel =
    formData.eventType === "OTHER"
      ? `Other (${formData.eventTypeOther || "Custom"})`
      : EVENT_TYPE_OPTIONS.find((o) => o.value === formData.eventType)?.label ||
        formData.eventType;

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Step 4: Final Review & Submission
        </span>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Review Your Event Requirement
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Verify all details before publishing. You can click <strong>Edit</strong> on any section to adjust your responses.
        </p>
      </div>

      {submitError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
          <div>
            <div className="font-bold">Submission Failed</div>
            <div className="text-xs text-rose-700 mt-0.5">{submitError}</div>
          </div>
        </div>
      )}

      {/* Section 1: Event Basics */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              1. Event Basics & Role
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 p-1 rounded hover:bg-indigo-50 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-xs text-slate-500 block">Event Name</span>
            <span className="font-semibold text-slate-800">{formData.eventName}</span>
          </div>

          <div>
            <span className="text-xs text-slate-500 block">Event Type</span>
            <span className="font-semibold text-slate-800">{eventTypeLabel}</span>
          </div>

          <div>
            <span className="text-xs text-slate-500 block">Selected Service</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {category}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-500 block">Dates</span>
            <span className="font-semibold text-slate-800">
              {formData.startDate}
              {formData.endDate ? ` → ${formData.endDate}` : " (Single-day)"}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-500 block">Location</span>
            <span className="font-semibold text-slate-800">{formData.location}</span>
          </div>

          <div>
            <span className="text-xs text-slate-500 block">Venue</span>
            <span className="font-semibold text-slate-800">
              {formData.venue || "To be decided / Private"}
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Category Details */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              2. {category} Specifications
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 p-1 rounded hover:bg-indigo-50 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>

        {category === "PLANNER" && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Guest Count</span>
                <span className="font-semibold text-slate-800">
                  {GUEST_COUNT_OPTIONS.find((o) => o.value === formData.guestCountRange)?.label ||
                    formData.guestCountRange}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Planning Scope</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {(formData.planningScope || []).map((scopeVal) => (
                    <span
                      key={scopeVal}
                      className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700 font-medium"
                    >
                      {PLANNING_SCOPE_OPTIONS.find((o) => o.value === scopeVal)?.label ||
                        scopeVal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {formData.themePreferences && (
              <div>
                <span className="text-xs text-slate-500 block">Theme / Aesthetics</span>
                <p className="text-slate-800 italic text-xs mt-0.5">
                  "{formData.themePreferences}"
                </p>
              </div>
            )}
          </div>
        )}

        {category === "PERFORMER" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-xs text-slate-500 block">Performer Type</span>
              <span className="font-semibold text-slate-800">
                {formData.performerType === "OTHER"
                  ? `Other (${formData.performerTypeOther})`
                  : PERFORMER_TYPE_OPTIONS.find((o) => o.value === formData.performerType)?.label ||
                    formData.performerType}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Genre / Style</span>
              <span className="font-semibold text-slate-800">{formData.genre}</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Duration</span>
              <span className="font-semibold text-slate-800">
                {formData.performanceDurationMinutes} minutes
              </span>
            </div>
          </div>
        )}

        {category === "CREW" && (
          <div className="space-y-2">
            <span className="text-xs text-slate-500 block">Crew Roles & Headcount:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(formData.roles || []).map((role, i) => {
                const label =
                  role.roleName === "OTHER"
                    ? `Other (${role.roleNameOther})`
                    : CREW_SPECIALIZATION_OPTIONS.find((o) => o.value === role.roleName)?.label ||
                      role.roleName;
                return (
                  <div
                    key={i}
                    className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg text-xs border border-slate-100"
                  >
                    <span className="font-medium text-slate-800">{label}</span>
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {role.count} {role.count === 1 ? "staff" : "staff"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Additional & Budget */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              3. Deliverables, Logistics & Budget
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 p-1 rounded hover:bg-indigo-50 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit
          </button>
        </div>

        {category === "PLANNER" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-xs text-slate-500 block">Catering Coordination</span>
              <span className="font-semibold text-slate-800">
                {formData.cateringCoordinationNeeded ? "Yes, Required" : "No"}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Decor & Lighting</span>
              <span className="font-semibold text-slate-800">
                {formData.decorLightingNeeded ? "Yes, Required" : "No"}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Budget Range</span>
              <span className="font-bold text-emerald-700">
                ₹{Number(formData.budgetMin).toLocaleString()} – ₹
                {Number(formData.budgetMax).toLocaleString()} INR
              </span>
            </div>
          </div>
        )}

        {category === "PERFORMER" && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Host Provides Sound</span>
                <span className="font-semibold text-slate-800">
                  {formData.soundEquipmentProvidedByHost ? "Yes (Venue Sound)" : "No (Performer brings)"}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Audience Vibe</span>
                <span className="font-semibold text-slate-800">
                  {AUDIENCE_VIBE_OPTIONS.find((o) => o.value === formData.audienceVibe)?.label ||
                    formData.audienceVibe}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Compensation Budget</span>
                <span className="font-bold text-emerald-700">
                  ₹{Number(formData.budgetMin).toLocaleString()} – ₹
                  {Number(formData.budgetMax).toLocaleString()} INR
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-500 block">Target Demographics</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {(formData.audienceAgeGroups || []).map((ageVal) => (
                  <span
                    key={ageVal}
                    className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700"
                  >
                    {AUDIENCE_AGE_OPTIONS.find((o) => o.value === ageVal)?.label || ageVal}
                  </span>
                ))}
              </div>
            </div>

            {formData.stageRequirements && (
              <div>
                <span className="text-xs text-slate-500 block">Stage Requirements</span>
                <p className="text-xs text-slate-700 mt-0.5 italic">
                  "{formData.stageRequirements}"
                </p>
              </div>
            )}
          </div>
        )}

        {category === "CREW" && (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Call Time</span>
                <span className="font-semibold text-slate-800">{formData.callTime} hrs</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Daily Shift</span>
                <span className="font-semibold text-slate-800">
                  {formData.shiftHoursPerDay} hours / day
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Pay Rate</span>
                <span className="font-bold text-emerald-700">
                  ₹{Number(formData.budgetAmount).toLocaleString()}{" "}
                  {CREW_RATE_UNITS.find((u) => u.value === formData.budgetUnit)?.label}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div>
                <span className="text-xs text-slate-500 block">Uniform Required</span>
                <span className="font-semibold text-slate-800">
                  {formData.uniformRequired ? "Yes" : "No"}
                  {formData.dressCode ? ` (${formData.dressCode})` : ""}
                </span>
              </div>
              {formData.prerequisites && (
                <div>
                  <span className="text-xs text-slate-500 block">Prerequisites</span>
                  <span className="text-xs text-slate-700 italic">
                    {formData.prerequisites}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onEditStep(3)}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          Back to Step 3
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting Requirement...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Publish Requirement
            </>
          )}
        </button>
      </div>
    </div>
  );
}
