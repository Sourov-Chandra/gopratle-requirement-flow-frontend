import React from "react";
import {
  EVENT_TYPE_OPTIONS,
  CATEGORY_OPTIONS,
} from "@/constants/form-options";
import {
  Calendar,
  MapPin,
  Building,
  Sparkles,
  CalendarCheck,
  Music,
  Users,
  AlertCircle,
} from "lucide-react";

const ICONS = {
  CalendarCheck,
  Music,
  Users,
};

export default function EventBasicsStep({ register, errors, watch, setValue }) {
  const selectedType = watch("eventType");
  const selectedCategory = watch("category");
  const startDate = watch("startDate");

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div className="border-b border-slate-200 pb-5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Step 1: Event Fundamentals
        </span>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Tell us about your event
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Provide the general event information and choose the type of professional service you require.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Event Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Annual Tech Symposium & Gala 2026"
            {...register("eventName")}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
              errors.eventName
                ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
            }`}
          />
          {errors.eventName && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.eventName.message}
            </p>
          )}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Event Type <span className="text-rose-500">*</span>
          </label>
          <select
            {...register("eventType")}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 bg-white ${
              errors.eventType
                ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
            }`}
          >
            <option value="">Select Event Type</option>
            {EVENT_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.eventType.message}
            </p>
          )}
        </div>

        {/* Custom Event Type (Conditional) */}
        {selectedType === "OTHER" ? (
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Specify Event Type <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Charity Auction, Product Launch"
              {...register("eventTypeOther")}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.eventTypeOther
                  ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            />
            {errors.eventTypeOther && (
              <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.eventTypeOther.message}
              </p>
            )}
          </div>
        ) : (
          <div className="hidden md:block" />
        )}

        {/* Start Date */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Start Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              min={todayStr}
              {...register("startDate")}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.startDate
                  ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            />
            <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
          </div>
          {errors.startDate && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* End Date */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-semibold text-slate-800">
              End Date <span className="text-xs font-normal text-slate-500">(Optional for multi-day)</span>
            </label>
          </div>
          <div className="relative">
            <input
              type="date"
              min={startDate || todayStr}
              {...register("endDate")}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.endDate
                  ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            />
            <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
          </div>
          {errors.endDate && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.endDate.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            City or Area <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Dhaka, Mumbai, Bangalore"
              {...register("location")}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.location
                  ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            />
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>
          {errors.location && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Venue */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Venue Name <span className="text-xs font-normal text-slate-500">(Optional)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Radisson Blu Grand Ballroom"
              {...register("venue")}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.venue
                  ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            />
            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>
          {errors.venue && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.venue.message}
            </p>
          )}
        </div>
      </div>

      {/* Professional Category Selection */}
      <div className="pt-4 border-t border-slate-200">
        <label className="block text-base font-bold text-slate-900 mb-1">
          Select Required Service Category <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-slate-500 mb-4">
          Choose the category of event specialist you need. Your form will adapt to this selection.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CATEGORY_OPTIONS.map((cat) => {
            const Icon = ICONS[cat.icon];
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setValue("category", cat.id, { shouldValidate: true })}
                className={`relative flex flex-col p-5 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/40 shadow-sm ring-1 ring-indigo-500"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {cat.badge}
                  </span>
                </div>

                <div className="text-base font-bold text-slate-900 mb-1">
                  {cat.title}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {cat.subtitle}
                </div>

                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-indigo-200/60 flex items-center gap-1.5 text-xs font-semibold text-indigo-700">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    Selected for requirement
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {errors.category && (
          <p className="mt-2 text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.category.message}
          </p>
        )}
      </div>
    </div>
  );
}
