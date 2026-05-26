"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useZodForm from "@/hooks/useZodForm";
import { ButtonSubmit } from "../ui/submitButton";
import addressCreateSchema from "@/lib/schema/addressCreate.schema";
import Map from "../map";
import { useRouter } from "next/navigation";
import { updateAddressAction } from "@/actions/address.action";
import axiosToast from "@/lib/toast";
import { MapPin, Info, Map as MapIcon, CircleDot } from "lucide-react";
import { useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { TAddress } from "@/models/address.model";

interface AddressUpdateFormProps {
  address: TAddress;
}

export default function AddressUpdateForm({ address }: AddressUpdateFormProps) {
  const { push } = useRouter();
  const { form, submitHandler } = useZodForm<typeof addressCreateSchema>(
    addressCreateSchema,
    {
      onSubmit: (data) => {
        const p = updateAddressAction(address.id, data);
        axiosToast(p, () => {
          push("/address");
        });
      },
      defaultValues: {
        name: address.name,
        detail: address.detail,
        longitude: address.longitude,
        latitude: address.latitude,
        radius: address.radius,
      },
    },
  );

  const { register, formState, setValue, control } = form;
  const { errors } = formState;

  const longitude = useWatch({ control, name: "longitude" });
  const latitude = useWatch({ control, name: "latitude" });

  const coordinateHandler = ({ lat, lng }: { lat: number; lng: number }) => {
    setValue("latitude", lat);
    setValue("longitude", lng);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-100">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50">
          <MapPin className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h2 className="text-sm font-medium text-zinc-900">Edit Address</h2>
          <p className="text-xs text-zinc-400">
            Update location coordinates and coverage radius
          </p>
        </div>
      </div>

      <form onSubmit={submitHandler}>
        <div className="px-6 py-5 space-y-6">
          {/* Section: Basic Info */}
          <section className="space-y-3">
            <SectionLabel
              icon={<Info className="w-3 h-3" />}
              label="Basic info"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                id="name"
                label="Location name"
                placeholder="e.g. Main Office"
                error={errors.name?.message}
                {...register("name")}
              />
              <FormField
                id="detail"
                label="Address detail"
                placeholder="Street, building, floor…"
                error={errors.detail?.message}
                {...register("detail")}
              />
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-zinc-100" />

          {/* Section: Pin Location */}
          <section className="space-y-3">
            <SectionLabel
              icon={<MapIcon className="w-3 h-3" />}
              label="Pin location"
            />
            <Map
              onCenterChange={coordinateHandler}
              position={{
                lat: latitude || address.latitude,
                lng: longitude || address.longitude,
              }}
            />

            {/* Hidden inputs for form registration */}
            <input
              type="hidden"
              {...register("longitude", { valueAsNumber: true })}
            />
            <input
              type="hidden"
              {...register("latitude", { valueAsNumber: true })}
            />

            {/* Coordinate display badges */}
            <div className="grid grid-cols-2 gap-3">
              <CoordBadge
                label="Longitude"
                value={longitude || address.longitude}
                hasError={!!errors.longitude}
              />
              <CoordBadge
                label="Latitude"
                value={latitude || address.latitude}
                hasError={!!errors.latitude}
              />
            </div>

            {(errors.longitude || errors.latitude) && (
              <p className="text-xs text-red-500">
                {errors.longitude?.message || errors.latitude?.message}
              </p>
            )}

            <p className="text-xs text-zinc-400">
              Coordinates are filled automatically when you move the map pin.
            </p>
          </section>

          {/* Divider */}
          <div className="border-t border-zinc-100" />

          {/* Section: Coverage */}
          <section className="space-y-3">
            <SectionLabel
              icon={<CircleDot className="w-3 h-3" />}
              label="Coverage"
            />
            <div className="space-y-1.5">
              <Label
                htmlFor="radius"
                className="text-xs text-zinc-500 font-normal"
              >
                Radius
              </Label>
              <div className="relative">
                <Input
                  id="radius"
                  {...register("radius", { valueAsNumber: true })}
                  type="number"
                  placeholder="0"
                  className="pr-10 bg-zinc-50 border-zinc-200 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 pointer-events-none">
                  m
                </span>
              </div>
              {errors.radius && (
                <p className="text-xs text-red-500">{errors.radius.message}</p>
              )}
              <p className="text-xs text-zinc-400">
                Area covered from the pinned coordinate.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 bg-zinc-50 border-t border-zinc-100">
          <button
            type="button"
            onClick={() => push("/address")}
            className="h-9 px-4 rounded-lg text-sm text-zinc-500 border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </button>
          <ButtonSubmit
            isSubmitting={formState.isSubmitting}
            label="Update address"
            className="h-9 px-5 rounded-lg text-sm"
          />
        </div>
      </form>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
      {icon}
      {label}
    </div>
  );
}

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

const FormField = ({ id, label, error, ...props }: FormFieldProps) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="text-xs text-zinc-500 font-normal">
      {label}
    </Label>
    <Input id={id} className="bg-zinc-50 border-zinc-200 text-sm" {...props} />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

function CoordBadge({
  label,
  value,
  hasError,
}: {
  label: string;
  value?: number;
  hasError?: boolean;
}) {
  const isEmpty = value === undefined || value === null || isNaN(value);
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 bg-zinc-50",
        hasError ? "border-red-200 bg-red-50" : "border-zinc-200",
      )}
    >
      <MapPin
        className={cn(
          "w-3.5 h-3.5 shrink-0",
          hasError ? "text-red-400" : "text-zinc-400",
        )}
      />
      <div className="min-w-0">
        <p className="text-[10px] text-zinc-400 leading-none mb-0.5">{label}</p>
        <p
          className={cn(
            "text-xs font-medium truncate",
            isEmpty ? "text-zinc-300" : "text-zinc-700",
          )}
        >
          {isEmpty ? "─" : value?.toFixed(6)}
        </p>
      </div>
    </div>
  );
}
