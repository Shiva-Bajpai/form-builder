import { useUserContext } from "@/store/userStore";
import React, { useState, useCallback, useRef, useEffect } from "react";
import DragIcon from "@/components/icons/DragIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PlusIcon from "@/components/icons/PlusIcon";
import { iconMapping, inputFieldMapping, OPTION_LIMIT } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MinusIcon from "@/components/icons/MinusIcon";
import CustomInput from "@/components/customInput";
import { AddQuestions } from "@/components/AddQuestions";
import DeleteIcon from "./icons/DeleteIcon";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { questionType } from "@/types/types";
import useAddQuestion from "@/app/hooks/useAddQuestion";
import useDragAndDrop from "@/app/hooks/useDragDrop";

function FormBuilder() {
  const { formBuilderData, setFormBuilderData, scrollRef } = useUserContext();
  const draggedIndex = useRef<number | null>(null);
  const [draggedOverFormBuilder, setDraggedOverFormBuilder] =
    useState<boolean>(false);

  // drag-drop to reorder

  const {
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleTouchMove,
    handleTouchStart,
    handleTouchEnd,
    hoveredIndex,
  } = useDragAndDrop();

  // update form data

  const {
    addOption,
    deleteQuestion,
    toggleRequired,
    removeOption,
    updateOption,
    updateQuestionField,
  } = useAddQuestion();

  // drag-drp form inner

  const handleDragoverFormBuilder = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (draggedIndex) return;

    setDraggedOverFormBuilder(true);
  }, []);
  const { handleAddQuestion } = useAddQuestion();

  const handleDragLeaveFormBuilder = useCallback((e: React.DragEvent) => {
    e.preventDefault();

    setDraggedOverFormBuilder(false);
  }, []);
  const handleDropFormBuilder = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();

      const category = e.dataTransfer.getData("text/plain");
      if (category) {
        handleAddQuestion(category as questionType["category"]);
      }
      setDraggedOverFormBuilder(false);
    },
    [handleAddQuestion]
  );

  // useEffect(() => {
  //   const handleTouchMoveWithPassive = (e: React.TouchEvent) => {
  //     handleTouchMove(e);
  //   };

  //   // Attach the passive event listener to the document
  //   document.addEventListener("touchmove", handleTouchMoveWithPassive, {
  //     passive: true,
  //   });

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener("touchmove", handleTouchMoveWithPassive);
  //   };
  // }, [handleTouchMove]);

  return (
    <div
      onDragOver={handleDragoverFormBuilder}
      onDragLeave={handleDragLeaveFormBuilder}
      onDrop={handleDropFormBuilder}
      className={`h-full  md:max-h-[calc(100vh-106px)] overflow-y-auto flex flex-col items-center gap-5 hide-scrollbar ${
        draggedOverFormBuilder && "border border-peerlistGreen"
      } max-md:p-2 max-md:py-16 p-6 justify-start`}
    >
      {formBuilderData.questions.map((question, questionIndex) => (
        <Card
          // ref={
          //   questionIndex == formBuilderData.questions.length - 1
          //     ? scrollRef
          //     : null
          // }
          key={questionIndex}
          draggable
          onDragStart={() => handleDragStart(questionIndex)}
          onDragOver={(e) => handleDragOver(e, questionIndex)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, questionIndex)}
          onTouchStart={() => handleTouchStart(questionIndex)}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          data-index={questionIndex}
          className={`w-full ${
            hoveredIndex === questionIndex
              ? "border-peerlistGreen border-spacing-0.5"
              : "border-spacing-0.5"
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-start gap-4">
              <CustomInput
                aria-label="question title"
                value={question.title}
                onChanged={(value) =>
                  updateQuestionField(questionIndex, "title", value)
                }
                placeholder={"Write a question"}
                variant={"title"}
              />
              <div className="flex gap-1">
                <div className="flex items-center">
                  {iconMapping[question?.category]}
                  <AddQuestions
                    currentQuestionIndex={questionIndex}
                    isInputField
                  />
                </div>
                <DragIcon />
              </div>
            </CardTitle>
            <CardDescription>
              <CustomInput
                aria-label="question helpText"
                value={question.helpText}
                variant={"helpText"}
                onChanged={(value) =>
                  updateQuestionField(questionIndex, "helpText", value)
                }
                placeholder={
                  "Write a help text or caption (leave empty if not needed)."
                }
              />
            </CardDescription>
          </CardHeader>
          <CardContent>
            {question.category === "single_select" ? (
              <RadioGroup>
                {question.options?.map((option, optionIndex) => (
                  <div
                    key={optionIndex + Math.random()}
                    className={`${
                      !option && "text-muted-foreground"
                    } flex items-center space-x-2`}
                  >
                    <RadioGroupItem
                      value={option || `Option ${optionIndex + 1}`}
                      id={option || `Option ${optionIndex + 1}`}
                    />
                    <CustomInput
                      aria-label="options"
                      className="after:left-1.5 md:text-sm"
                      value={option || undefined}
                      onChanged={(value) =>
                        updateOption(questionIndex, optionIndex, value)
                      }
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                    {question.options && (
                      <>
                        {optionIndex === 0 ? null : (
                          <>
                            {optionIndex === OPTION_LIMIT - 1 ? (
                              <MinusIcon
                                onClick={() =>
                                  removeOption(questionIndex, optionIndex)
                                }
                              />
                            ) : (
                              <>
                                {optionIndex < question.options.length - 1 && (
                                  <MinusIcon
                                    onClick={() =>
                                      removeOption(questionIndex, optionIndex)
                                    }
                                  />
                                )}
                              </>
                            )}
                          </>
                        )}
                        {optionIndex === question.options.length - 1 &&
                          optionIndex !== OPTION_LIMIT - 1 && (
                            <PlusIcon
                              onClick={() => addOption(questionIndex)}
                            />
                          )}
                      </>
                    )}
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <>{inputFieldMapping[question?.category]}</>
            )}
            <CardFooter className="flex justify-between items-center pt-3">
              <div onClick={(e: any) => deleteQuestion(e, questionIndex)}>
                <DeleteIcon className="text-red-500 cursor-pointer" />
              </div>
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor={`required-${questionIndex}`}
                  className="font-normal text-xs"
                >
                  Required
                </Label>
                <Switch
                  checked={question?.required}
                  id={`required-${questionIndex}`}
                  onCheckedChange={() => toggleRequired(questionIndex)}
                />
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      ))}
      {formBuilderData.questions.length <= 2 && <AddQuestions />}
      <div ref={scrollRef} />
    </div>
  );
}

export default FormBuilder;
