"use client";
import { formType } from "@/types/types";
import { Heading } from "./typography/heading";
import FormProgress from "./FormProgress";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { areOptionsValid } from "@/lib/utils";
import { FormSubmitInput } from "./FormSubmitInput";
import React, { useState, useEffect, useCallback } from "react";
import validateFormSubmission from "@/validation/formSubmissionValidation";
import api from "@/lib/api";
import { LoaderCircle } from "lucide-react";

function RenderSubmissionForm({
  data,
  prevSubmitted,
}: {
  data: formType;
  prevSubmitted: Record<string, string>;
}) {
  const [formData, setFormData] = useState<Record<string, string>>(
    prevSubmitted ||
      data.questions.reduce((acc, question) => {
        acc[question._id] = "";
        return acc;
      }, {} as Record<string, string>)
  );

  const [error, setError] = useState<Set<any>>(new Set());
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const handleChange = useCallback(
    (questionId?: string, value?: string) => {
      if (!questionId || value === undefined) return;

      setFormData((prev) => ({
        ...prev,
        [questionId]: value,
      }));

      if (error.has(questionId)) {
        error.delete(questionId);
      }
    },
    [error]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setError(new Set());
        const formData = new FormData(e.currentTarget);
        const formObject: { [key: string]: string } = {};

        formData.forEach((value, key) => {
          formObject[key] = value.toString(); // Ensure value is a string
        });

        const answers = Object.entries(formObject).map(([key, value]) => ({
          _id: key,
          value,
        }));

        const validate = validateFormSubmission(data.questions, answers);

        if (validate.errors) {
          const errorIds = new Set(
            validate.errors.map((error) => error.id).filter((id) => id)
          );
          console.error(validate.errors);

          setError(errorIds);
          return;
        }
        setLoader(true);
        const res = await api.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/form/submit/${data._id}`,
          answers,
          {
            credentials: "include",
          }
        );
        if (res.success) {
          setSubmitted(true);
        }
        if (res.error && Array.isArray(res.error)) {
          const errorIds = new Set(
            (res.error as any)
              .map((error: any) => error.id)
              .filter((id: any) => id)
          );
          setError(errorIds);
        }
      } finally {
        setLoader(false);
      }
    },
    [data]
  );

  const calculateProgress = useCallback(() => {
    const answeredCount = Object.values(formData).filter(
      (value) => value.trim() !== ""
    ).length;

    const max = data.questions.filter(
      (item) =>
        item.options &&
        item.options.filter((option) => option === null).length == 0
    ).length;

    const progressPercentage = Math.round((answeredCount / max) * 100);
    setProgress(progressPercentage);
  }, [formData, data.questions]);

  useEffect(() => {
    calculateProgress();
  }, [formData, calculateProgress]);

  return (
    <>
      {/* left sidebar */}
      <div className="col-span-1 max-lg:hidden max-md:hidden" />

      <div className="col-span-2 max-lg:col-span-4 flex flex-col justify-between border border-t-0 border-b-0 h-full">
        {/* Header */}
        <div className="border-b  border-t-0 flex p-2 max-md:px-2 px-6 gap-4 items-center justify-between w-full">
          <Heading size="tiny" className=" font-semibold text-sm text-black">
            {!submitted ? data.form_title : "Form Recieved"}
          </Heading>
          <FormProgress progress={progress} />
        </div>
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="h-full max-h-[calc(100vh-50px)] overflow-y-auto flex flex-col items-center gap-5 hide-scrollbar max-md:p-2 max-md:py-5 p-6 justify-start"
          >
            {data.questions.map((question) => {
              if (!question.title) return;
              if (
                question.category === "single_select" &&
                question.options &&
                areOptionsValid(question.options)
              )
                return;

              return (
                <Card
                  key={question._id || question.id}
                  className=" w-full py-0 border-none hover:bg-transparent"
                >
                  <CardHeader className=" p-0 pb-2">
                    <CardTitle>
                      <Label
                        className={` md:text-base font-semibold ${
                          error.has(question._id) && "text-peerlistRed"
                        }`}
                      >
                        {question?.title}
                        {question.required && (
                          <span className="text-peerlistRed">*</span>
                        )}
                      </Label>
                    </CardTitle>
                    {question.helpText && (
                      <CardDescription className=" md:text-sm">
                        {question.helpText}
                      </CardDescription>
                    )}
                  </CardHeader>
                  {question.category === "single_select" ? (
                    <RadioGroup
                      defaultValue={formData[question._id]}
                      name={question._id}
                      id={question._id}
                      required={question.required}
                      onValueChange={(value) =>
                        handleChange(question._id, value)
                      }
                    >
                      {question.options?.map((option) => {
                        if (!option) return;
                        return (
                          <div
                            key={option}
                            className="flex items-center space-x-1.5"
                          >
                            <RadioGroupItem
                              value={option}
                              id={option}
                            ></RadioGroupItem>
                            <Label
                              htmlFor={option}
                              className=" text-sm font-medium"
                            >
                              {option}
                            </Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  ) : (
                    <FormSubmitInput
                      question={question}
                      required={question.required}
                      defaultValue={formData[question._id]}
                      name={question._id}
                      id={question._id}
                      onChange={(
                        e: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => handleChange(question._id, e.target.value)}
                      className="hover:bg-peerlistBackground"
                    />
                  )}
                </Card>
              );
            })}
            <Button
              disabled={loader}
              type="submit"
              size="sm"
              className="gap-0.5 px-3.5 font-semibold py-1.5 self-end"
              variant="peerlist"
            >
              Submit
              {loader && <LoaderCircle className="  size-4 animate-spin" />}
            </Button>
          </form>
        ) : (
          <div className=" flex items-center justify-center h-full font-semibold">
            Form received ❤️
          </div>
        )}
      </div>

      {/* right sidebar */}
      <div className="col-span-1 max-lg:hidden max-md:hidden" />
    </>
  );
}

export default RenderSubmissionForm;
