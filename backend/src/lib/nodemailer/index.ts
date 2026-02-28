import { createTransport } from "nodemailer";
import { z } from "zod";

import p from "path";

import { userEmailTemplate } from "./email.template";
import type { EmailTemplateType } from "./email.template";

const user = z.string().parse(process.env.NODEMAILER_USER);
const pass = z.string().parse(process.env.NODEMAILER_PASS);

const transpoter = createTransport({
  service: "gmail",
  auth: { user, pass },
});

export const verifyEmail = async (payload: EmailTemplateType, to: string) => {
  const path = p.join(__dirname, "../templates", "verifyRegister.hbs");
  const html = userEmailTemplate(path, payload);
  return await transpoter.sendMail({
    from: user,
    to,
    subject: payload.subject,
    html,
  });
};

export const verifyEmailFP = async (payload: EmailTemplateType, to: string) => {
  const path = p.join(
    __dirname,
    "../templates",
    "verifyEmailForgetPassword.hbs",
  );
  const html = userEmailTemplate(path, payload);
  return await transpoter.sendMail({
    from: user,
    to,
    subject: payload.subject,
    html,
  });
};
