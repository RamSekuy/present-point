"use client";

import {
  DefaultValues,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import z, { output } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Options<S extends z.ZodObject> = {
  defaultValues?: Partial<z.infer<S>>;
  onSubmit: (data: z.infer<S>) => void;
};

export default function useZodForm<S extends z.ZodObject>(
  schema: S,
  { defaultValues, onSubmit }: Options<S>,
) {
  type T = z.infer<S>;
  const form = useForm<T>({
    resolver: zodResolver(schema) as Resolver<T, any, T>,
    defaultValues: defaultValues as DefaultValues<output<S>>,
  });

  return {
    form,
    submitHandler: form.handleSubmit(onSubmit as SubmitHandler<T>),
  };
}
