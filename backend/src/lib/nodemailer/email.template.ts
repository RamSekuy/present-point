import { readFileSync } from "fs";
import { compile } from "handlebars";
import { z } from "zod";

export type EmailTemplateType = {
  subject: string;
  full_name: string;
  token: string;
};

const baseUrl = z.string().optional().parse(process.env.CORS);

export const userEmailTemplate = (path: string, payload: EmailTemplateType) => {
  const source = readFileSync(path, "utf-8");
  const compiledTemplete = compile(source);
  return compiledTemplete({ ...payload, baseUrl });
};
