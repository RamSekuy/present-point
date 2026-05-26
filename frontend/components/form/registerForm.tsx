"use client";

import { useState } from "react";
import useZodForm from "@/hooks/useZodForm";
import { axiosCSR } from "@/lib/axios.csr";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonSubmit } from "@/components/ui/submitButton";
import { CardContent } from "../ui/card";
import Image from "next/image";
import actionToast from "@/lib/toast";
import registerSchema from "@/lib/schema/register.schema";
import { registerAction } from "@/actions/auth.action";
import { objectToFormData } from "@/lib/schema/formData";

export default function RegisterForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const { form, submitHandler } = useZodForm<typeof registerSchema>(
    registerSchema,
    {
      onSubmit: (data) => {
        const _data = objectToFormData(data);
        const upload = registerAction(_data);
        actionToast(upload, () => {
          form.reset();
          setPreview(null);
        });
      },
    },
  );

  const { register, setValue, formState } = form;
  const { errors, isSubmitting } = formState;

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("image", file, { shouldValidate: true });
    setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <CardContent>
        <form className="space-y-5" onSubmit={submitHandler}>
          {/* NAME */}
          <div className="space-y-2">
            <Label>Nama</Label>
            <Input {...register("name")} placeholder="Enter your fullname" />
            {errors.name && (
              <p className="text-sm text-red-500">
                {String(errors.name.message)}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input {...register("email")} placeholder="Enter your email" />
            {errors.name && (
              <p className="text-sm text-red-500">
                {String(errors.name.message)}
              </p>
            )}
          </div>
          {/* Password */}
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
            />
            {errors.name && (
              <p className="text-sm text-red-500">
                {String(errors.name.message)}
              </p>
            )}
          </div>

          {/* IMAGE */}
          <div className="space-y-2">
            <Label>Profile Image {"(Recomended use 1:1 image)"}</Label>
            <Input type="file" accept="image/*" onChange={handleImage} />
            {errors.image && (
              <p className="text-sm text-red-500">
                {String(errors.image.message)}
              </p>
            )}
          </div>

          {/* IMAGE PREVIEW */}
          {preview && (
            <div className="relative h-40 aspect-square rounded-full overflow-hidden mx-auto">
              <Image
                src={preview}
                alt="Preview"
                fill
                objectFit="fill"
                className="w-full h-auto rounded-md"
              />
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end">
            <ButtonSubmit isSubmitting={isSubmitting} label="Register" />
          </div>
        </form>
      </CardContent>
    </div>
  );
}
