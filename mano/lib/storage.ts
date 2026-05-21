export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function createId() {
  return crypto.randomUUID();
}

export const STORAGE_KEYS = {
  members: "seimos-nariai",
  shopping: "seimos-pirkiniu-sarasas",
  points: "seimos-taskai",
  familyChat: "seimos-pokalbiai",
  privateChat: "seimos-asmeniniai-pokalbiai",
  calendar: "seimos-kalendorius",
  notes: "seimos-pastabos",
  photos: "seimos-nuotraukos",
} as const;
