const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

/**
 * Helper to build payload according to category details schema
 */
export function formatRequirementPayload(formData) {
  const { category } = formData;

  const base = {
    eventName: formData.eventName,
    eventType: formData.eventType,
    eventTypeOther:
      formData.eventType === "OTHER" ? formData.eventTypeOther || null : null,
    startDate: formData.startDate,
    endDate: formData.endDate && formData.endDate.trim() !== "" ? formData.endDate : null,
    location: formData.location,
    venue: formData.venue && formData.venue.trim() !== "" ? formData.venue : null,
    category,
  };

  let categoryDetails = {};

  if (category === "PLANNER") {
    categoryDetails = {
      guestCountRange: formData.guestCountRange,
      themePreferences: formData.themePreferences || null,
      planningScope: formData.planningScope || [],
      cateringCoordinationNeeded: Boolean(formData.cateringCoordinationNeeded),
      decorLightingNeeded: Boolean(formData.decorLightingNeeded),
      budgetRange: {
        min: Number(formData.budgetMin || 0),
        max: Number(formData.budgetMax || 0),
        currency: "INR",
      },
    };
  } else if (category === "PERFORMER") {
    categoryDetails = {
      performerType: formData.performerType,
      performerTypeOther:
        formData.performerType === "OTHER"
          ? formData.performerTypeOther || null
          : null,
      genre: formData.genre,
      performanceDurationMinutes: Number(formData.performanceDurationMinutes),
      soundEquipmentProvidedByHost: Boolean(formData.soundEquipmentProvidedByHost),
      stageRequirements: formData.stageRequirements || null,
      audienceVibe: formData.audienceVibe,
      audienceAgeGroups: formData.audienceAgeGroups || [],
      budgetRange: {
        min: Number(formData.budgetMin || 0),
        max: Number(formData.budgetMax || 0),
        currency: "INR",
      },
    };
  } else if (category === "CREW") {
    categoryDetails = {
      roles: (formData.roles || []).map((r) => ({
        roleName: r.roleName,
        roleNameOther: r.roleName === "OTHER" ? r.roleNameOther || null : null,
        count: Number(r.count),
      })),
      callTime: formData.callTime,
      shiftHoursPerDay: Number(formData.shiftHoursPerDay),
      uniformRequired: Boolean(formData.uniformRequired),
      dressCode: formData.dressCode || null,
      prerequisites: formData.prerequisites || null,
      budgetRate: {
        amount: Number(formData.budgetAmount || 0),
        unit: formData.budgetUnit || "PER_PERSON_PER_DAY",
        currency: "INR",
      },
    };
  }

  return {
    ...base,
    categoryDetails,
  };
}

export async function submitRequirement(formData) {
  const payload = formatRequirementPayload(formData);

  const response = await fetch(`${API_BASE_URL}/requirements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.errors = data.errors || [];
    throw error;
  }

  return data;
}

export async function fetchHealth() {
  const res = await fetch(`${API_BASE_URL}/health`);
  return res.json();
}
