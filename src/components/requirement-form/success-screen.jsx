import React, { useState } from "react";
import { CheckCircle2, Copy, Check, PlusCircle, Calendar, Tag, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function SuccessScreen({ resultData, onReset }) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    if (resultData?.id) {
      navigator.clipboard.writeText(resultData.id);
      setCopied(true);
      toast.success("Requirement ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="text-center py-8 px-4 max-w-xl mx-auto animate-fadeIn">
      {/* Animated Success Badge */}
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5 ring-8 ring-emerald-50">
        <CheckCircle2 className="w-10 h-10 text-emerald-600 stroke-[2.2]" />
      </div>

      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-3">
        <ShieldCheck className="w-3.5 h-3.5" />
        Requirement Successfully Saved
      </span>

      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Requirement Published!
      </h1>
      <p className="text-slate-600 text-sm mb-8 max-w-md mx-auto">
        Your requirement is now live on <strong>EventTalentBridge</strong>. Event specialists matching your criteria can now review your request.
      </p>

      {/* Confirmation Details Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left mb-8 shadow-xs space-y-4">
        {/* Requirement ID */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
            Requirement ID
          </span>
          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3.5 py-2">
            <code className="text-xs font-mono font-bold text-indigo-700 select-all">
              {resultData?.id || "N/A"}
            </code>
            <button
              type="button"
              onClick={handleCopyId}
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Copy ID"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Status & Event Info */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200/80">
          <div>
            <span className="text-xs text-slate-500 block mb-0.5">Status</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {resultData?.status || "OPEN"}
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-500 block mb-0.5">Category</span>
            <span className="text-sm font-bold text-slate-900">
              {resultData?.category}
            </span>
          </div>

          <div className="col-span-2">
            <span className="text-xs text-slate-500 block mb-0.5">Event Name</span>
            <span className="text-sm font-semibold text-slate-800">
              {resultData?.eventName}
            </span>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Post Another Requirement
        </button>
      </div>
    </div>
  );
}
