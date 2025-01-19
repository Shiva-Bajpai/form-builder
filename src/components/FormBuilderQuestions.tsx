// import DragIcon from "@/components/icons/DragIcon";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import PlusIcon from "@/components/icons/PlusIcon";
// import { iconMapping, inputFieldMapping, OPTION_LIMIT } from "@/lib/utils";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import MinusIcon from "@/components/icons/MinusIcon";
// import CustomInput from "@/components/customInput";
// import { AddQuestions } from "@/components/AddQuestions";
// import DeleteIcon from "./icons/DeleteIcon";
// import { Label } from "./ui/label";
// import { Switch } from "./ui/switch";
// import { questionType } from "@/types/types";
// import { useSortable } from "@dnd-kit/sortable";
// import useAddQuestion from "@/app/hooks/useAddQuestion";
// import { CSS } from "@dnd-kit/utilities";

// function FormBuilderQuestions({
//   question,
//   questionIndex,
// }: {
//   question: questionType;
//   questionIndex: number;
// }) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: question.id });
//   const {
//     addOption,
//     deleteQuestion,
//     toggleRequired,
//     removeOption,
//     updateOption,
//     updateQuestionField,
//   } = useAddQuestion();
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };
//   return (
//     <Card
//       ref={setNodeRef}
//       {...attributes}
//       {...listeners}
//       style={style}
//       className="w-full border"
//     >
//       <CardHeader>
//         <CardTitle className="flex items-center gap-4">
//           <CustomInput
//             value={question.title}
//             onChanged={(value) =>
//               updateQuestionField(questionIndex, "title", value)
//             }
//             placeholder={"Write a question"}
//             variant={"title"}
//           />
//           <div className="flex gap-1">
//             <div className="flex items-center">
//               {iconMapping[question?.category]}
//               <AddQuestions currentQuestionIndex={questionIndex} isInputField />
//             </div>
//             <DragIcon />
//           </div>
//         </CardTitle>
//         <CardDescription>
//           <CustomInput
//             value={question.helpText}
//             variant={"helpText"}
//             onChanged={(value) =>
//               updateQuestionField(questionIndex, "helpText", value)
//             }
//             placeholder={
//               "Write a help text or caption (leave empty if not needed)."
//             }
//           />
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {question.category === "single_select" ? (
//           <RadioGroup>
//             {question.options?.map((option, optionIndex) => (
//               <div
//                 key={optionIndex + Math.random()}
//                 className={`${
//                   !option && "text-muted-foreground"
//                 } flex items-center space-x-2`}
//               >
//                 <RadioGroupItem
//                   value={option || `Option ${optionIndex + 1}`}
//                   id={option || `Option ${optionIndex + 1}`}
//                 />
//                 <CustomInput
//                   value={option || undefined}
//                   onChanged={(value) =>
//                     updateOption(questionIndex, optionIndex, value)
//                   }
//                   placeholder={`Option ${optionIndex + 1}`}
//                 />
//                 {question.options && (
//                   <>
//                     {optionIndex === 0 ? null : (
//                       <>
//                         {optionIndex === OPTION_LIMIT - 1 ? (
//                           <MinusIcon
//                             onClick={() =>
//                               removeOption(questionIndex, optionIndex)
//                             }
//                           />
//                         ) : (
//                           <>
//                             {optionIndex < question.options.length - 1 && (
//                               <MinusIcon
//                                 onClick={() =>
//                                   removeOption(questionIndex, optionIndex)
//                                 }
//                               />
//                             )}
//                           </>
//                         )}
//                       </>
//                     )}
//                     {optionIndex === question.options.length - 1 &&
//                       optionIndex !== OPTION_LIMIT - 1 && (
//                         <PlusIcon onClick={() => addOption(questionIndex)} />
//                       )}
//                   </>
//                 )}
//               </div>
//             ))}
//           </RadioGroup>
//         ) : (
//           <>{inputFieldMapping[question?.category]}</>
//         )}
//         <CardFooter className="flex justify-between items-center pt-3">
//           <div onClick={(e: any) => deleteQuestion(e, questionIndex)}>
//             <DeleteIcon className="text-red-500 cursor-pointer" />
//           </div>
//           <div className="flex items-center space-x-2">
//             <Label
//               htmlFor={`required-${questionIndex}`}
//               className="font-normal text-xs"
//             >
//               Required
//             </Label>
//             <Switch
//               checked={question?.required}
//               id={`required-${questionIndex}`}
//               onCheckedChange={() => toggleRequired(questionIndex)}
//             />
//           </div>
//         </CardFooter>
//       </CardContent>
//     </Card>
//   );
// }

// export default FormBuilderQuestions;
