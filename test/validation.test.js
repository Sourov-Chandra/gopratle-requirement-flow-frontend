import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  step1Schema,
  step2PlannerSchema,
  step3PlannerSchema,
  step2PerformerSchema,
  step3PerformerSchema,
  step2CrewSchema,
  step3CrewSchema,
} from "../src/lib/validation.js";

describe("Client Form Step Validation", () => {
  describe("Step 1 Validation", () => {
    test("passes with valid event basics", () => {
      const res = step1Schema.safeParse({
        eventName: "Summer Beats Gala",
        eventType: "CONCERT",
        startDate: "2026-12-15",
        endDate: "2026-12-16",
        location: "Dhaka",
        venue: "Convention Center",
        category: "PERFORMER",
      });
      assert.equal(res.success, true);
    });

    test("fails if eventName is less than 2 chars", () => {
      const res = step1Schema.safeParse({
        eventName: "X",
        eventType: "CONCERT",
        startDate: "2026-12-15",
        location: "Dhaka",
        category: "PERFORMER",
      });
      assert.equal(res.success, false);
    });

    test("fails if endDate precedes startDate", () => {
      const res = step1Schema.safeParse({
        eventName: "Summer Beats Gala",
        eventType: "CONCERT",
        startDate: "2026-12-20",
        endDate: "2026-12-18",
        location: "Dhaka",
        category: "PERFORMER",
      });
      assert.equal(res.success, false);
    });
  });

  describe("Step 2 & 3 Category Validation", () => {
    test("validates planner scope and budget", () => {
      const step2 = step2PlannerSchema.safeParse({
        guestCountRange: "50_200",
        planningScope: ["FULL_PLANNING"],
      });
      assert.equal(step2.success, true);

      const step3 = step3PlannerSchema.safeParse({
        cateringCoordinationNeeded: true,
        decorLightingNeeded: false,
        budgetMin: 50000,
        budgetMax: 100000,
      });
      assert.equal(step3.success, true);
    });

    test("validates crew roles headcount and rate", () => {
      const step2 = step2CrewSchema.safeParse({
        roles: [
          { roleName: "USHERS_HOSTESSES", count: 4 },
          { roleName: "AV_LIGHTING_TECHNICIANS", count: 2 },
        ],
      });
      assert.equal(step2.success, true);

      const step3 = step3CrewSchema.safeParse({
        callTime: "08:00",
        shiftHoursPerDay: 8,
        uniformRequired: true,
        budgetAmount: 1200,
        budgetUnit: "PER_PERSON_PER_DAY",
      });
      assert.equal(step3.success, true);
    });
  });
});
