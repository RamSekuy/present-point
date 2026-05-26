import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import FormDataNode from "form-data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function formDataToObject(fd: FormData) {
  const obj: Record<string, any> = {};

  for (const [key, value] of fd.entries()) {
    if (value instanceof File) {
      obj[key] = value;
    } else {
      try {
        obj[key] = JSON.parse(value as string);
      } catch {
        obj[key] = value;
      }
    }
  }

  return obj;
}

// lib/server/toNodeFormData.ts

export async function toNodeFormData(data: Record<string, any>) {
  const form = new FormDataNode();

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof File) {
      const buffer = Buffer.from(await value.arrayBuffer());
      form.append(key, buffer, value.name);
    } else {
      form.append(key, value);
    }
  }

  return form;
}
