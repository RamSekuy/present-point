"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useZodForm from "@/hooks/useZodForm";
import { axiosCSR } from "@/lib/axios.csr";
import { ButtonSubmit } from "../ui/submitButton";
import axiosToast from "@/lib/toast";
import { Card, CardContent } from "../ui/card";
import addressCreateSchema from "@/lib/schema/addressCreate.schema";
import Map from "../map";

export default function AddressCreateForm() {
  const { form, submitHandler } = useZodForm<typeof addressCreateSchema>(
    addressCreateSchema,
    {
      onSubmit: (data) => {
        const p = axiosCSR().post("/address/c", data);
        axiosToast(p, () => {});
      },
    },
  );

  const { register, formState, setValue } = form;
  const { errors } = formState;
  const coordinateHandler = ({ lat, lng }: { lat: number; lng: number }) => {
    setValue("latitude", lat);
    setValue("longitude", lng);
  };
  return (
    <Card>
      <CardContent>
        <form className="space-y-5" onSubmit={submitHandler}>
          <div className="space-y-2">
            <Label htmlFor="longitude">Location Name</Label>
            <Input
              id="name"
              {...register("name")}
              type="text"
              placeholder="Location Name"
            />
            {errors.longitude && (
              <p className="text-sm text-red-500">
                {String(errors.longitude.message)}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude">Address Detail</Label>
            <Input
              id="detail"
              {...register("detail")}
              type="text"
              placeholder="Location Address Detail"
            />
            {errors.longitude && (
              <p className="text-sm text-red-500">
                {String(errors.longitude.message)}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <Map onCenterChange={coordinateHandler} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              readOnly
              id="longitude"
              {...register("longitude", { valueAsNumber: true })}
              type="number"
              placeholder="Longitude"
            />
            {errors.longitude && (
              <p className="text-sm text-red-500">
                {String(errors.longitude.message)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              readOnly
              id="latitude"
              {...register("latitude", { valueAsNumber: true })}
              type="number"
              placeholder="Latitude"
            />
            {errors.latitude && (
              <p className="text-sm text-red-500">
                {String(errors.latitude.message)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="radius">Radius</Label>
            <Input
              id="radius"
              {...register("radius", { valueAsNumber: true })}
              type="number"
              placeholder="Radius (meter)"
            />
            {errors.radius && (
              <p className="text-sm text-red-500">
                {String(errors.radius.message)}
              </p>
            )}
          </div>

          <ButtonSubmit
            isSubmitting={form.formState.isSubmitting}
            className="w-full"
            label="Create Address"
          />
        </form>
      </CardContent>
    </Card>
  );
}
