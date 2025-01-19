import { questionType } from "@/types/types";

interface SubmittedQuestion {
  _id: any; // Add _id to match the form structure
  value: string | undefined;
}

interface ValidationError {
  id?: string;
  category?: string;
  type: string;
  message: string;
  allowedOptions?: (string | null | undefined)[];
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[] | null;
}

export default function validateFormSubmission(
  formStructure: questionType[],
  submittedForm: SubmittedQuestion[]
): ValidationResult {
  const errors: ValidationError[] = [];

  // Create a map of form question ids for easy lookup
  const formQuestionMap = new Map(formStructure.map((q) => [q._id, q]));

  // Track if there are any valid submissions
  let hasValidQuestions = false;

  // Iterate through each question in the submitted form
  submittedForm.forEach((submittedQuestion) => {
    const questionStructure = formQuestionMap.get(submittedQuestion._id);

    if (!questionStructure) {
      errors.push({
        type: "QUESTION_NOT_FOUND",
        message: `No matching question found for submitted _id: ${submittedQuestion._id}`,
      });
      return;
    }

    // Check if required questions are filled
    if (
      questionStructure.required &&
      (!submittedQuestion.value || submittedQuestion.value.trim() === "")
    ) {
      errors.push({
        id: questionStructure._id,
        category: questionStructure.category,
        type: "REQUIRED_FIELD_EMPTY",
        message: "Required field is empty",
      });
      return;
    }

    // Validate based on category
    switch (questionStructure.category) {
      case "url":
        if (submittedQuestion.value) {
          if (!submittedQuestion.value.startsWith("http")) {
            errors.push({
              id: questionStructure._id,
              category: "url",
              type: "INVALID_URL",
              message: `Invalid URL format`,
            });
          }
        }
        break;

      case "date":
        if (submittedQuestion.value) {
          const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
          if (!dateRegex.test(submittedQuestion.value)) {
            errors.push({
              id: questionStructure._id,
              category: "date",
              type: "INVALID_DATE",
              message: `Invalid date format. Use YYYY-MM-DD format`,
            });
          }
        }
        break;

      case "single_select":
        if (
          questionStructure.options &&
          questionStructure.options.length === 1
        ) {
          if (!questionStructure.options.includes(submittedQuestion.value)) {
            errors.push({
              id: questionStructure._id,
              category: "single_select",
              type: "INVALID_SELECTION",
              message: `Selected option not in allowed options`,
              allowedOptions: questionStructure.options,
            });
          }
        }
        break;

      case "short_answer":
        if (submittedQuestion.value && submittedQuestion.value.length > 100) {
          errors.push({
            id: questionStructure._id,
            category: "short_answer",
            type: "ANSWER_TOO_LONG",
            message: `Short answer too long. Max 100 characters.`,
          });
        }
        break;

      case "long_answer":
        if (submittedQuestion.value && submittedQuestion.value.length > 1000) {
          errors.push({
            id: questionStructure._id,
            category: "long_answer",
            type: "ANSWER_TOO_LONG",
            message: `Long answer too long. Max 1000 characters.`,
          });
        }
        break;

      case "number":
        if (submittedQuestion.value) {
          const numRegex = /^-?\d+$/;
          if (!numRegex.test(submittedQuestion.value)) {
            errors.push({
              id: questionStructure._id,
              category: "number",
              type: "INVALID_NUMBER",
              message: "Invalid number format",
            });
          }
        }
        break;
    }

    // If no errors, this is a valid question
    if (errors.length === 0) {
      hasValidQuestions = true;
    }
  });

  // Return validation result
  return {
    isValid: errors.length === 0 && hasValidQuestions,
    errors: errors.length > 0 ? errors : null,
  };
}
