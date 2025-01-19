import { questionType } from "@/types/types";

interface ValidationError {
  id: number;
  category: string;
  type: string;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[] | null;
}

function validateFormStructure(
  formStructure: questionType[]
): ValidationResult {
  const errors: ValidationError[] = [];

  // Check if formStructure is an array and not empty
  if (!Array.isArray(formStructure)) {
    return {
      isValid: false,
      errors: [
        {
          id: 0,
          category: "general",
          type: "INVALID_STRUCTURE",
          message: "Form structure must be a non-empty array",
        },
      ],
    };
  }

  // Return validation result
  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : null,
  };
}

export { validateFormStructure };
