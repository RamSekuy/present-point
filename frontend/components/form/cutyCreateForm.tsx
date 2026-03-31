"use client";

import cutyCreateSchema from "@/lib/schema/cutyCreate.schema";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useZodForm from "@/hooks/useZodForm";
import { axiosCSR } from "@/lib/axios.csr";
import { ButtonSubmit } from "../ui/submitButton";
import { useRouter } from "next/navigation";
import axiosToast from "@/lib/toast";
import { useUser } from "@/contexts/user.context";
import SelectDate from "@/app/(user)/cuty/_components/selectDate";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

export default function CutyCreateForm() {
  const { push } = useRouter();
  const { user } = useUser();
  const { form, submitHandler } = useZodForm<typeof cutyCreateSchema>(
    cutyCreateSchema,
    {
      onSubmit: (data) => {
        const p = axiosCSR().post(`/cuty/${user?.id}`, data);
        axiosToast(p, () => {
          push("/cuty");
        });
      },
      defaultValues: {
        userId: user?.id,
        startDate: new Date(),
        endDate: new Date(),
      },
    },
  );

  const { register, setValue } = form;
  const [dateInput, setDateInput] = useState<{ s: Date; e: Date }>({
    s: new Date(),
    e: new Date(),
  });
  const sDate = dateInput.s;
  const eDate = dateInput.e;
  const handleDateChange = (type: "s" | "e", date: Date) => {
    setDateInput((prev) => ({ ...prev, [type]: date }));
    setValue(type === "s" ? "startDate" : "endDate", date);
  };
  return (
    <form className="space-y-5" onSubmit={submitHandler}>
      <div className="hidden">
        <Input id="userId" {...register("userId")} type="string" readOnly />
      </div>

      <div className="flex flex-col justify-center items-center mx-auto md:flex-row gap-4">
        <div>
          <p className="text-center w-full font-semibold">Start Date</p>
          <SelectDate
            value={sDate}
            onDayClick={(date) => handleDateChange("s", date)}
          />
        </div>
        <div>
          <p className="text-center w-full font-semibold">End Date</p>
          <SelectDate
            value={eDate}
            onDayClick={(date) => handleDateChange("e", date)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="font-semibold">
          Description
        </Label>
        <Textarea {...register("description")} />
      </div>
      <ButtonSubmit
        isSubmitting={form.formState.isSubmitting}
        className="w-full"
        label="Create Cuty Request"
      />
    </form>
  );
}
