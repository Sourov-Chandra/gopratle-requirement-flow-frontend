import RequirementWizard from "@/components/requirement-form/requirement-wizard";
import { Sparkles, CalendarDays, Shield, Award } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Page Hero Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
          <Sparkles className="w-3.5 h-3.5" />
          Event Host Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Post an Event Requirement
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Specify your event particulars and connect directly with verified event
          planners, stage performers, and on-ground crew.
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-600" />
            Vetted Professionals
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4 text-indigo-600" />
            Fast Turnaround
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-indigo-600" />
            Direct MongoDB Storage
          </span>
        </div>
      </div>

      {/* Main Requirement Wizard */}
      <RequirementWizard />
    </div>
  );
}
