"use client";

import * as React from "react";
import { format, parse } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import DateIcon from "../icons/DateIcon";

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DatePicker({
  defaultValue,
  onChange,
  ...props
}: DatePickerProps) {
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const [date, setDate] = React.useState<Date>();
  React.useEffect(() => {
    if (defaultValue && typeof defaultValue === "string") {
      setDate(parse(defaultValue, "MM-dd-yyyy", new Date()));
    } else {
      setDate(undefined); // Reset date if value is empty or invalid
    }
  }, [defaultValue]);
  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onChange) {
      closeRef.current?.click();
      // Format the date to MM-DD-YYYY and pass it as e.target.value
      const formattedDate = selectedDate
        ? format(selectedDate, "MM-dd-yyyy")
        : "";
      onChange({
        target: {
          value: formattedDate,
        },
      } as React.ChangeEvent<HTMLInputElement>); // Manually trigger onChange with the formatted date
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : undefined;
    setDate(newDate);
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger
          asChild
          disabled={props.disabled}
          className="disabled:bg-peerlistHoverBackground p-2"
        >
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between text-left font-normal shadow-sm",
              !date && "text-muted-foreground"
            )}
          >
            <input
              {...props}
              className=" outline-none cursor-pointer select-none font-normal  max-md:text-xs bg-transparent"
              value={date ? format(date, "MM-dd-yyyy") : "MM-DD-YYYY"}
              type="text"
              readOnly
              onChange={handleInputChange}
            />
            <DateIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <PopoverClose ref={closeRef} />
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
