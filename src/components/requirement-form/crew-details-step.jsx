import React from "react";
import {
  CREW_SPECIALIZATION_OPTIONS,
  CREW_RATE_UNITS,
} from "@/constants/form-options";
import {
  AlertCircle,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  Shirt,
  Users,
} from "lucide-react";

export default function CrewDetailsStep({
  step,
  register,
  errors,
  watch,
  setValue,
}) {
  const roles = watch("roles") || [{ roleName: "USHERS_HOSTESSES", count: 2, roleNameOther: "" }];
  const uniformRequired = watch("uniformRequired");

  const addRole = () => {
    setValue("roles", [
      ...roles,
      { roleName: "STAGEHANDS", count: 2, roleNameOther: "" },
    ]);
  };

  const removeRole = (index) => {
    if (roles.length <= 1) return;
    const updated = roles.filter((_, i) => i !== index);
    setValue("roles", updated);
  };

  const updateRoleField = (index, field, value) => {
    const updated = [...roles];
    updated[index][field] = value;
    setValue("roles", updated, { shouldValidate: true });
  };

  if (step === 2) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="border-b border-slate-200 pb-5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Step 2: Crew Roles & Headcount
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Staff Specializations & Numbers
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Specify the operational roles required and how many staff members are needed per position.
          </p>
        </div>

        {/* Roles Dynamic Repeater */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-bold text-slate-800">
              Required Crew Positions <span className="text-rose-500">*</span>
            </label>
            <button
              type="button"
              onClick={addRole}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-200/60"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Another Role
            </button>
          </div>

          {roles.map((role, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-white relative space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Role #{idx + 1}
                </span>
                {roles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRole(idx)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title="Remove role"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Specialization */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Specialization
                  </label>
                  <select
                    value={role.roleName}
                    onChange={(e) => updateRoleField(idx, "roleName", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100 bg-white"
                  >
                    {CREW_SPECIALIZATION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Staff Count */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Headcount (Staff)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={role.count}
                    onChange={(e) => updateRoleField(idx, "count", Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100"
                  />
                </div>

                {/* Custom Role Name if Other */}
                {role.roleName === "OTHER" && (
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Specify Custom Role Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bilingual Guest Concierge, Valet Coordinator"
                      value={role.roleNameOther || ""}
                      onChange={(e) => updateRoleField(idx, "roleNameOther", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {errors.roles && (
            <p className="text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.roles.message}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Step 3: Shift, Uniform & Budget Rate
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="border-b border-slate-200 pb-5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Step 3: Shift Logistics & Crew Pay Rate
        </span>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Working Hours & Budget Rate
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Specify reporting call time, shift length, dress requirements, and remuneration per staff.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Call Time */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Reporting Call Time <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="time"
              {...register("callTime")}
              className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.callTime
                  ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            />
          </div>
          {errors.callTime && (
            <p className="mt-1 text-xs text-rose-600">{errors.callTime.message}</p>
          )}
        </div>

        {/* Shift Duration */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Shift Duration per Day (Hours) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min={1}
              max={24}
              placeholder="8"
              {...register("shiftHoursPerDay")}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.shiftHoursPerDay
                  ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                  : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
              }`}
            />
            <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>
          {errors.shiftHoursPerDay && (
            <p className="mt-1 text-xs text-rose-600">
              {errors.shiftHoursPerDay.message}
            </p>
          )}
        </div>

        {/* Uniform Toggle */}
        <div className="md:col-span-2 p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">
                Is a Specific Uniform / Dress Code Required?
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Specify if staff must wear specific attire (e.g. All Black, White Collared Shirt, Blazers).
              </div>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                setValue("uniformRequired", true, { shouldValidate: true })
              }
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                uniformRequired === true
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() =>
                setValue("uniformRequired", false, { shouldValidate: true })
              }
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                uniformRequired === false
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Dress Code Details */}
        {uniformRequired && (
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Dress Code Details <span className="text-xs font-normal text-slate-500">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Crisp black formal collared shirt, black trousers, and polished black shoes"
              {...register("dressCode")}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100"
            />
          </div>
        )}

        {/* Prerequisites */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-800 mb-1.5">
            Physical or Technical Prerequisites <span className="text-xs font-normal text-slate-500">(Optional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Ability to lift up to 20kg, fluency in English, experience with digital registration iPads..."
            {...register("prerequisites")}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* Crew Budget Rate */}
      <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200">
        <label className="block text-sm font-bold text-slate-900 mb-1">
          Budget Compensation Rate (₹ INR) <span className="text-rose-500">*</span>
        </label>
        <p className="text-xs text-slate-500 mb-4">
          Rate offered per crew member, specified on an hourly or daily basis.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Rate Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-semibold text-sm">
                ₹
              </span>
              <input
                type="number"
                min={1}
                placeholder="1000"
                {...register("budgetAmount")}
                className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100 bg-white"
              />
            </div>
            {errors.budgetAmount && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.budgetAmount.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Rate Unit
            </label>
            <select
              {...register("budgetUnit")}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-100 bg-white"
            >
              {CREW_RATE_UNITS.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
