import { z } from "zod";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

// Step 1: Event Basics Schema
export const step1Schema = z
  .object({
    eventName: z
      .string()
      .trim()
      .min(2, "Event name must be at least 2 characters")
      .max(120, "Event name cannot exceed 120 characters"),
    eventType: z.string().min(1, "Please select an event type"),
    eventTypeOther: z.string().nullish().transform((v) => v || ""),
    startDate: z
      .string()
      .regex(DATE_REGEX, "Please provide a valid start date (YYYY-MM-DD)"),
    endDate: z
      .string()
      .nullish()
      .transform((v) => v || ""),
    location: z
      .string()
      .trim()
      .min(2, "Location must be at least 2 characters")
      .max(120, "Location cannot exceed 120 characters"),
    venue: z
      .string()
      .max(160, "Venue cannot exceed 160 characters")
      .nullish()
      .transform((v) => v || ""),
    category: z.enum(["PLANNER", "PERFORMER", "CREW"], {
      required_error: "Please select a required professional category",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.eventType === "OTHER") {
      if (!data.eventTypeOther || data.eventTypeOther.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify the custom event type (at least 2 characters)",
          path: ["eventTypeOther"],
        });
      }
    }
    if (data.endDate && data.endDate.trim() !== "") {
      if (!DATE_REGEX.test(data.endDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End date must be in YYYY-MM-DD format",
          path: ["endDate"],
        });
      } else if (data.startDate && data.endDate < data.startDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End date cannot be earlier than start date",
          path: ["endDate"],
        });
      }
    }
  });

// Step 2 & 3 Schemas by Category

// --- PLANNER ---
export const step2PlannerSchema = z.object({
  guestCountRange: z.string().min(1, "Please select expected guest count"),
  themePreferences: z.string().max(500, "Theme preferences cannot exceed 500 characters").optional(),
  planningScope: z.array(z.string()).min(1, "Select at least one planning scope"),
});

export const step3PlannerSchema = z
  .object({
    cateringCoordinationNeeded: z.boolean(),
    decorLightingNeeded: z.boolean(),
    budgetMin: z.coerce.number().min(0, "Minimum budget cannot be negative"),
    budgetMax: z.coerce.number().min(0, "Maximum budget cannot be negative"),
  })
  .refine((data) => data.budgetMax >= data.budgetMin, {
    message: "Maximum budget must be greater than or equal to minimum budget",
    path: ["budgetMax"],
  });

// --- PERFORMER ---
export const step2PerformerSchema = z
  .object({
    performerType: z.string().min(1, "Please select performer type"),
    performerTypeOther: z.string().optional(),
    genre: z.string().trim().min(2, "Genre or style must be at least 2 characters").max(100),
    performanceDurationMinutes: z.coerce
      .number()
      .int()
      .min(15, "Duration must be at least 15 minutes")
      .max(1440, "Duration cannot exceed 1440 minutes (24h)"),
  })
  .refine(
    (data) => {
      if (data.performerType === "OTHER") {
        return !!data.performerTypeOther && data.performerTypeOther.trim().length >= 2;
      }
      return true;
    },
    {
      message: "Please specify the custom performer type",
      path: ["performerTypeOther"],
    }
  );

export const step3PerformerSchema = z
  .object({
    soundEquipmentProvidedByHost: z.boolean(),
    stageRequirements: z.string().max(500).optional(),
    audienceVibe: z.string().min(1, "Please select audience vibe"),
    audienceAgeGroups: z.array(z.string()).min(1, "Select at least one target age group"),
    budgetMin: z.coerce.number().min(0, "Minimum budget cannot be negative"),
    budgetMax: z.coerce.number().min(0, "Maximum budget cannot be negative"),
  })
  .refine((data) => data.budgetMax >= data.budgetMin, {
    message: "Maximum budget must be greater than or equal to minimum budget",
    path: ["budgetMax"],
  });

// --- CREW ---
export const step2CrewSchema = z.object({
  roles: z
    .array(
      z.object({
        roleName: z.string().min(1, "Role is required"),
        roleNameOther: z.string().optional(),
        count: z.coerce.number().int().min(1, "Headcount must be at least 1").max(100, "Max 100 staff"),
      })
    )
    .min(1, "At least one crew role is required")
    .refine(
      (roles) =>
        roles.every((r) => {
          if (r.roleName === "OTHER") {
            return !!r.roleNameOther && r.roleNameOther.trim().length >= 2;
          }
          return true;
        }),
      {
        message: "Please specify the custom role name for 'Other'",
        path: ["roles"],
      }
    ),
});

export const step3CrewSchema = z.object({
  callTime: z.string().regex(TIME_REGEX, "Call time must be in HH:MM format (24-hour)"),
  shiftHoursPerDay: z.coerce.number().min(1, "Shift must be at least 1 hour").max(24, "Max 24 hours"),
  uniformRequired: z.boolean(),
  dressCode: z.string().max(300).optional(),
  prerequisites: z.string().max(500).optional(),
  budgetAmount: z.coerce.number().min(1, "Budget rate must be at least 1"),
  budgetUnit: z.enum(["PER_PERSON_PER_HOUR", "PER_PERSON_PER_DAY"]),
});
