"use client";

import loginSchema from "@/lib/schema/login.schema";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useZodForm from "@/hooks/useZodForm";
import { axiosCSR } from "@/lib/axios.csr";
import { ButtonSubmit } from "../ui/submitButton";
import { useRouter } from "next/navigation";
import axiosToast from "@/lib/toast";

export default function LoginForm() {
  const { push } = useRouter();
  const { form, submitHandler } = useZodForm<typeof loginSchema>(loginSchema, {
    onSubmit: (data) => {
      const p = axiosCSR().post("/auth/v2", data);
      axiosToast(p, () => {
        push("/dashboard");
      });
    },
  });

  const { register, formState } = form;
  const { errors } = formState;

  return (
    <form className="space-y-5" onSubmit={submitHandler}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register("email")}
          type="email"
          placeholder="example@domain.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{String(errors.email.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          {...register("password")}
          type="password"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-sm text-red-500">
            {String(errors.password.message)}
          </p>
        )}
      </div>

      <ButtonSubmit
        isSubmitting={form.formState.isSubmitting}
        className="w-full"
        label="Login"
      />
    </form>
  );
}
