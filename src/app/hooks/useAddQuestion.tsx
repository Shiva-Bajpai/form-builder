import { OPTION_LIMIT } from "@/lib/utils";
import { useUserContext } from "@/store/userStore";
import { questionType } from "@/types/types";
import { useCallback } from "react";
import { toast } from "sonner";

function useAddQuestion() {
  const { setFormBuilderData, scrollRef, formBuilderData } = useUserContext();
  const handleAddQuestion = useCallback(
    (category: questionType["category"]) => {
      //@ts-expect-error:ignore _id
      setFormBuilderData((prev) => {
        const newQuestion = {
          id: prev.questions.length + 1,
          category,
          title: undefined,
          helpText: undefined,
          required: false,
        };

        if (category === "single_select") {
          return {
            ...prev,
            questions: [
              ...prev.questions,
              {
                ...newQuestion,
                options: [undefined, undefined], // Add an options field for single_select
              },
            ],
          };
        }

        // For other categories, just add the question without 'options'
        return {
          ...prev,
          questions: [...prev.questions, newQuestion],
        };
      });
      const t = setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 0);
      return () => clearTimeout(t);
    },
    [setFormBuilderData, scrollRef]
  );

  // update form data
  const addOption = useCallback(
    (questionIndex: number) => {
      const updatedQuestions = [...formBuilderData.questions];
      const question = updatedQuestions[questionIndex];
      if (!question.options) return;
      if (question.options.length < OPTION_LIMIT) {
        question.options.push(undefined); // Add an empty option
        setFormBuilderData((prev) => ({
          ...prev,
          questions: updatedQuestions,
        }));
      }
    },
    [formBuilderData, setFormBuilderData]
  );

  const removeOption = useCallback(
    (questionIndex: number, optionIndex: number) => {
      const updatedQuestions = [...formBuilderData.questions];
      const question = updatedQuestions[questionIndex];
      if (!question.options) return;
      if (question.options.length > 1) {
        question.options.splice(optionIndex, 1);
        setFormBuilderData((prev) => ({
          ...prev,
          questions: updatedQuestions,
        }));
      }
    },
    [formBuilderData, setFormBuilderData]
  );

  const deleteQuestion = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, questionIndex: number) => {
      e.stopPropagation();
      const updatedQuestions = formBuilderData.questions.filter(
        (_, index) => index !== questionIndex
      );
      setFormBuilderData((prev) => ({
        ...prev,
        questions: updatedQuestions,
      }));
    },
    [formBuilderData, setFormBuilderData]
  );

  const toggleRequired = useCallback(
    (questionIndex: number) => {
      const updatedQuestions = [...formBuilderData.questions];
      updatedQuestions[questionIndex].required =
        !updatedQuestions[questionIndex].required;
      setFormBuilderData((prev) => ({
        ...prev,
        questions: updatedQuestions,
      }));
    },
    [formBuilderData, setFormBuilderData]
  );

  const updateQuestionField = useCallback(
    <K extends keyof questionType>(
      questionIndex: number,
      field: K,
      value: questionType[K]
    ) => {
      const blank = value?.toString().trim().length == 0;

      const updatedQuestions = [...formBuilderData.questions];
      (updatedQuestions[questionIndex][field] as any) = blank
        ? undefined
        : value; // Dynamically update the field
      setFormBuilderData((prev) => ({
        ...prev,
        questions: updatedQuestions,
      }));
    },
    [formBuilderData.questions, setFormBuilderData]
  );

  const updateOption = useCallback(
    (questionIndex: number, optionIndex: number, value: string) => {
      const blank = value?.toString().trim().length == 0;

      const updatedQuestions = [...formBuilderData.questions];
      const question = updatedQuestions[questionIndex];

      if (question.options) {
        question.options[optionIndex] = blank ? undefined : value; // Update the specific option
      }

      setFormBuilderData((prev) => ({
        ...prev,
        questions: updatedQuestions,
      }));
    },
    [formBuilderData.questions, setFormBuilderData]
  );

  const handleShare = async () => {
    if (!formBuilderData.publish) return;
    try {
      const url = window.location.origin + "/form/" + formBuilderData._id;
      if (navigator.share) {
        await navigator.share({ url });
        toast.success("Shared the link successfully!");
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    handleAddQuestion,
    addOption,
    deleteQuestion,
    toggleRequired,
    removeOption,
    updateOption,
    updateQuestionField,
    handleShare,
  };
}

export default useAddQuestion;
