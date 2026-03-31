"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  value?: Date;
  onDayClick?: (date: Date) => void;
};

export default function SelectDate({ value, onDayClick }: Props) {
  return (
    <>
      <input type="hidden" value={value?.toISOString()} readOnly />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {value?.toLocaleDateString("en-Gb") || "Select Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-max">
          <Calendar className="w-76" selected={value} onDayClick={onDayClick} />
        </PopoverContent>
      </Popover>
    </>
  );
}
