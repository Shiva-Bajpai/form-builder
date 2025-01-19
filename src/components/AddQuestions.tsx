import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropDownIcon from "@/components/icons/DropDownIcon";
import { Button } from "@/components/ui/button";
import PlusIcon from "./icons/PlusIcon";
import { useCallback, useMemo } from "react";
import { questionType } from "@/types/types";
import { useUserContext } from "@/store/userStore";
import { questionTypes } from "@/lib/utils";
import useAddQuestion from "@/app/hooks/useAddQuestion";

export function AddQuestions({
  isInputField = false,
  currentQuestionIndex,
}: {
  currentQuestionIndex?: number;
  isInputField?: boolean;
}) {
  const { setFormBuilderData } = useUserContext();

  const memoizedQuestionTypes = useMemo(() => questionTypes, []);

  const { handleAddQuestion: handleAdd } = useAddQuestion();

  const handleReplace = useCallback(
    (category: questionType["category"], index: number) => {
      setFormBuilderData((prev) => {
        const updatedQuestions = [...prev.questions];
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          category,
          title: prev.questions[index].title,
          helpText: prev.questions[index].helpText,
        };

        if (category === "single_select") {
          updatedQuestions[index] = {
            ...updatedQuestions[index],
            options:
              prev.questions[index].options &&
              prev.questions[index].options?.length > 0
                ? prev.questions[index].options
                : [undefined, undefined],
          };
        }

        return {
          ...prev,
          questions: updatedQuestions,
        };
      });
    },
    [setFormBuilderData]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="focus-visible:ring-0 outline-none focus:outline-none"
        asChild={isInputField ? false : true}
      >
        {isInputField ? (
          <DropDownIcon />
        ) : (
          <Button size="sm" className="py-1 gap-0" variant="outline">
            <PlusIcon />
            Add Question
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 rounded-xl">
        {memoizedQuestionTypes.map(({ category, label, icon }) => (
          <DropdownMenuItem
            key={category}
            onClick={() => {
              if (isInputField) {
                if (currentQuestionIndex !== undefined) {
                  handleReplace(
                    category as questionType["category"],
                    currentQuestionIndex
                  );
                }
              } else {
                // Add a new question
                handleAdd(category as questionType["category"]);
              }
            }}
          >
            {icon}
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
