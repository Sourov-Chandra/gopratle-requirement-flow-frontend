"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

import ProgressIndicator from "./progress-indicator";
import EventBasicsStep from "./event-basics-step";
import PlannerDetailsStep from "./planner-details-step";
import PerformerDetailsStep from "./performer-details-step";
import CrewDetailsStep from "./crew-details-step";
import ReviewStep from "./review-step";
import SuccessScreen from "./success-screen";

import {
  step1Schema,
  step2PlannerSchema,
  step3PlannerSchema,
  step2PerformerSchema,
  step3PerformerSchema,
  step2CrewSchema,
  step3CrewSchema,
} from "@/lib/validation";
import { submitRequirement } from "@/lib/api";
import { saveDraft, loadDraft, clearDraft } from "@/lib/draft-storage";

const DEFAULT_FORM_VALUES = {
  // Step 1
  eventName: "",
  eventType: "",
  eventTypeOther: "",
  startDate: "",
  endDate: "",
  location: "",
  venue: "",
  category: "PLANNER",

  // Planner
  guestCountRange: "50_200",
  themePreferences: "",
  planningScope: ["FULL_PLANNING"],
  cateringCoordinationNeeded: true,
  decorLightingNeeded: true,
  budgetMin: 50000,
  budgetMax: 150000,

  // Performer
  performerType: "DJ",
  performerTypeOther: "",
  genre: "",
  performanceDurationMinutes: 90,
  soundEquipmentProvidedByHost: true,
  stageRequirements: "",
  audienceVibe: "HIGH_ENERGY",
  audienceAgeGroups: ["ADULTS"],

  // Crew
  roles: [
    { roleName: "USHERS_HOSTESSES", count: 4, roleNameOther: "" },
    { roleName: "AV_LIGHTING_TECHNICIANS", count: 2, roleNameOther: "" },
  ],
  callTime: "08:00",
  shiftHoursPerDay: 8,
  uniformRequired: true,
  dressCode: "",
  prerequisites: "",
  budgetAmount: 1200,
  budgetUnit: "PER_PERSON_PER_DAY",
};

export default function RequirementWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onBlur",
  });

  const category = watch("category");
  const allValues = watch();

  // Load draft on initial mount
  useEffect(() => {
    const saved = loadDraft();
    if (saved) {
      reset({ ...DEFAULT_FORM_VALUES, ...saved });
      toast.info("Unfinished draft restored from previous session", {
        duration: 3000,
      });
    }
  }, [reset]);

  // Auto-save draft on form value changes
  useEffect(() => {
    if (!submissionResult) {
      saveDraft(allValues);
    }
  }, [allValues, submissionResult]);

  // Validate the current step before advancing
  const validateCurrentStep = () => {
    clearErrors();
    const values = watch();

    if (currentStep === 1) {
      const res = step1Schema.safeParse({
        eventName: values.eventName,
        eventType: values.eventType,
        eventTypeOther: values.eventTypeOther,
        startDate: values.startDate,
        endDate: values.endDate,
        location: values.location,
        venue: values.venue,
        category: values.category,
      });

      if (!res.success) {
        res.error.issues.forEach((issue) => {
          setError(issue.path[0], { message: issue.message });
        });
        toast.error("Please fill in all required event details");
        return false;
      }
      return true;
    }

    if (currentStep === 2) {
      let schema;
      let stepValues;

      if (category === "PLANNER") {
        schema = step2PlannerSchema;
        stepValues = {
          guestCountRange: values.guestCountRange,
          themePreferences: values.themePreferences,
          planningScope: values.planningScope,
        };
      } else if (category === "PERFORMER") {
        schema = step2PerformerSchema;
        stepValues = {
          performerType: values.performerType,
          performerTypeOther: values.performerTypeOther,
          genre: values.genre,
          performanceDurationMinutes: values.performanceDurationMinutes,
        };
      } else if (category === "CREW") {
        schema = step2CrewSchema;
        stepValues = {
          roles: values.roles,
        };
      }

      const res = schema.safeParse(stepValues);
      if (!res.success) {
        res.error.issues.forEach((issue) => {
          setError(issue.path[0], { message: issue.message });
        });
        toast.error("Please complete the required category details");
        return false;
      }
      return true;
    }

    if (currentStep === 3) {
      let schema;
      let stepValues;

      if (category === "PLANNER") {
        schema = step3PlannerSchema;
        stepValues = {
          cateringCoordinationNeeded: values.cateringCoordinationNeeded,
          decorLightingNeeded: values.decorLightingNeeded,
          budgetMin: values.budgetMin,
          budgetMax: values.budgetMax,
        };
      } else if (category === "PERFORMER") {
        schema = step3PerformerSchema;
        stepValues = {
          soundEquipmentProvidedByHost: values.soundEquipmentProvidedByHost,
          stageRequirements: values.stageRequirements,
          audienceVibe: values.audienceVibe,
          audienceAgeGroups: values.audienceAgeGroups,
          budgetMin: values.budgetMin,
          budgetMax: values.budgetMax,
        };
      } else if (category === "CREW") {
        schema = step3CrewSchema;
        stepValues = {
          callTime: values.callTime,
          shiftHoursPerDay: values.shiftHoursPerDay,
          uniformRequired: values.uniformRequired,
          dressCode: values.dressCode,
          prerequisites: values.prerequisites,
          budgetAmount: values.budgetAmount,
          budgetUnit: values.budgetUnit,
        };
      }

      const res = schema.safeParse(stepValues);
      if (!res.success) {
        res.error.issues.forEach((issue) => {
          setError(issue.path[0], { message: issue.message });
        });
        toast.error("Please verify logistics and budget inputs");
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    clearErrors();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStepJump = (stepNum) => {
    clearErrors();
    setCurrentStep(stepNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetDraft = () => {
    if (window.confirm("Are you sure you want to discard your draft and start over?")) {
      clearDraft();
      reset(DEFAULT_FORM_VALUES);
      setCurrentStep(1);
      setSubmissionResult(null);
      setSubmitError(null);
      toast.info("Draft reset to default");
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await submitRequirement(allValues);
      clearDraft();
      setSubmissionResult(response.data);
      toast.success("Requirement posted successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission error:", err);
      const errMsg =
        err.errors && err.errors.length > 0
          ? err.errors.map((e) => e.message).join(", ")
          : err.message || "Unable to submit requirement. Please try again.";
      setSubmitError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionResult) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-10">
        <SuccessScreen
          resultData={submissionResult}
          onReset={() => {
            reset(DEFAULT_FORM_VALUES);
            setSubmissionResult(null);
            setCurrentStep(1);
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-8 md:p-10 relative">
      {/* Draft Reset Button */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={handleResetDraft}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors p-1 rounded hover:bg-slate-100"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Draft
        </button>
      </div>

      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} onStepClick={handleStepJump} />

      {/* Step Components */}
      <form onSubmit={(e) => e.preventDefault()}>
        {currentStep === 1 && (
          <EventBasicsStep
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}

        {(currentStep === 2 || currentStep === 3) && category === "PLANNER" && (
          <PlannerDetailsStep
            step={currentStep}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}

        {(currentStep === 2 || currentStep === 3) && category === "PERFORMER" && (
          <PerformerDetailsStep
            step={currentStep}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}

        {(currentStep === 2 || currentStep === 3) && category === "CREW" && (
          <CrewDetailsStep
            step={currentStep}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}

        {currentStep === 4 && (
          <ReviewStep
            formData={allValues}
            onEditStep={handleStepJump}
            onSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}

        {/* Wizard Footer Navigation (for Steps 1-3) */}
        {currentStep < 4 && (
          <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
