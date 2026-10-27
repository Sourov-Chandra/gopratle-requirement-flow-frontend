const STORAGE_KEY = "eventtalentbridge_requirement_draft_v1";

export function saveDraft(data) {
  if (typeof window === "undefined") return;
  try {
    const payload = {
      version: 1,
      updatedAt: new Date().toISOString(),
      data,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn("Failed to save draft to localStorage:", err);
  }
}

export function loadDraft() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.version === 1 && parsed.data) {
      return parsed.data;
    }
    return null;
  } catch (err) {
    console.warn("Failed to load draft from localStorage:", err);
    return null;
  }
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Failed to clear draft from localStorage:", err);
  }
}
