import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface FormProgressProps {
  progress: number;
  label?: string;
}

export default function FormProgress({
  progress,
  label = "Form Completed",
}: FormProgressProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setValue(progress), 100);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className=" w-[15rem] space-y-1">
      <div className="flex items-start max-md:text-xs justify-end text-sm">
        <span className=" font-normal text-sm">
          {label} — {progress}%
        </span>
      </div>
      <Progress value={value} className="h-1" />
    </div>
  );
}
