import { questionType } from "@/types/types";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import DatePicker from "./ui/CalenderInput";
import React, { useMemo } from "react";

const inputFieldMapping: Record<
  questionType["category"],
  (props: any) => JSX.Element
> = {
  short_answer: (props: any) => (
    <Input
      {...props}
      type="text"
      placeholder="Your answer"
      variant="nofilled"
    />
  ),
  long_answer: (props: any) => (
    <Textarea {...props} placeholder="Your answer" />
  ),
  single_select: (props: any) => (
    <Input
      {...props}
      type="text"
      placeholder="Your answer"
      variant="nofilled"
    />
  ),
  number: (props: any) => (
    <Input
      {...props}
      type="number"
      placeholder="Your answer"
      variant="nofilled"
    />
  ),
  url: (props: any) => (
    <Input {...props} type="url" placeholder="Your answer" variant="nofilled" />
  ),
  date: (props: any) => <DatePicker {...props} />,
};

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  question: questionType;
}
export const FormSubmitInput = ({ question, ...props }: CustomInputProps) => {
  const memo = useMemo(() => inputFieldMapping, []);
  const Component = memo[question.category];

  if (!Component) {
    console.error(`Unsupported category: ${question.category}`);
    return null;
  }

  // Pass value and onChange to the component
  return <Component {...props} />;
};
