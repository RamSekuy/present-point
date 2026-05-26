// lib/zodFormData.ts
export function objectToFormData(data: Record<string, any>) {
  const fd = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // File / Blob
    if (value instanceof File || value instanceof Blob) {
      fd.append(key, value);
      return;
    }

    // Array
    if (Array.isArray(value)) {
      value.forEach((v) => fd.append(key, JSON.stringify(v)));
      return;
    }

    // Object / number / boolean / string
    if (typeof value === "object") {
      fd.append(key, JSON.stringify(value));
      return;
    }

    fd.append(key, JSON.stringify(value));
  });

  return fd;
}
