import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DateIcon from "@/components/icons/DateIcon";
import UrlIcon from "@/components/icons/UrlIcon";
import SingleSelect from "@/components/icons/SingleSelect";
import LongAnswerIcon from "@/components/icons/LongAnswerIcon";
import ShortAnswerIcon from "@/components/icons/ShortAnswerIcon";
import NumberIcon from "@/components/icons/NumberIcon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CalenderInput from "@/components/ui/CalenderInput";
import { questionType } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const iconMapping: Record<questionType["category"], JSX.Element> = {
  short_answer: <ShortAnswerIcon />,
  long_answer: <LongAnswerIcon />,
  single_select: <SingleSelect />,
  number: <NumberIcon />,
  url: <UrlIcon />,
  date: <DateIcon />,
};

export const inputFieldMapping: Record<questionType["category"], JSX.Element> =
  {
    short_answer: (
      <Input
        disabled
        type="text"
        placeholder="Write a answer"
        defaultValue={""}
        variant="nofilled"
      />
    ),
    long_answer: (
      <Textarea disabled placeholder="Write a answer" defaultValue={""} />
    ),
    single_select: (
      <Input
        disabled
        type="text"
        placeholder="Write a answer"
        defaultValue={""}
        variant="nofilled"
      />
    ),
    number: (
      <Input
        disabled
        type="number"
        placeholder="Write a answer"
        defaultValue={""}
        variant="nofilled"
      />
    ),
    url: (
      <Input
        disabled
        type="url"
        placeholder="Write a answer"
        defaultValue={""}
        variant="nofilled"
      />
    ),
    date: <CalenderInput disabled />,
  };

export const questionTypes = [
  {
    category: "short_answer",
    label: "Short answer",
    icon: <ShortAnswerIcon />,
  },
  { category: "long_answer", label: "Long answer", icon: <LongAnswerIcon /> },
  { category: "number", label: "Number", icon: <NumberIcon /> },
  { category: "single_select", label: "Single select", icon: <SingleSelect /> },
  { category: "url", label: "URL", icon: <UrlIcon /> },
  { category: "date", label: "Date", icon: <DateIcon /> },
];

export function areOptionsValid(options: any[]): boolean {
  if (options.filter((option) => option === null).length == 0) {
    return false;
  }

  return true;
}
export const OPTION_LIMIT = 11;
