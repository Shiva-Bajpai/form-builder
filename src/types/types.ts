export interface formType {
  _id?: string;
  form_title: string;
  questions: questionType[];
  publish?: boolean;
}
// Types for formQuestion
export interface questionType {
  _id: string;
  id: number;
  category:
    | "short_answer"
    | "long_answer"
    | "single_select"
    | "date"
    | "url"
    | "number";
  required: boolean;
  title?: string;
  helpText?: string;
  options?: (string | null | undefined)[];
}
