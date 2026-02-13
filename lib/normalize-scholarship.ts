export const pickString = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.en === "string") return record.en;
    if (typeof record.uz === "string") return record.uz;
    const firstString = Object.values(record).find(
      (v) => typeof v === "string",
    );
    if (typeof firstString === "string") return firstString;
  }
  return "";
};

export const pickStringArray = (value: unknown): string[] => {
  if (typeof value === "string") {
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string");
  }
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const candidate =
      (record.en as unknown) ??
      (record.uz as unknown) ??
      Object.values(record)[0];
    if (Array.isArray(candidate)) {
      return candidate.filter((v): v is string => typeof v === "string");
    }
  }
  return [];
};

export const normalizeScholarship = <T extends Record<string, any>>(item: T) => {
  return {
    ...item,
    title: pickString(item.title),
    description: pickString(item.description),
    targetCountry: pickString(item.targetCountry),
    fieldOfStudy: pickStringArray(item.fieldOfStudy),
    eligibleRegions: pickStringArray(item.eligibleRegions),
  };
};
