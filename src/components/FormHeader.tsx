import React, { useCallback, useEffect, useState } from "react";
import RightArrow from "@/components/icons/RightArrow";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/customInput";
import { useUserContext } from "@/store/userStore";
import Link from "next/link";
import { ShareIcon } from "lucide-react";
import useAddQuestion from "@/app/hooks/useAddQuestion";
import { Input } from "./ui/input";
import useDebounce from "@/app/hooks/useDebounce";
function FormHeaderComp() {
  const { formBuilderData, setFormBuilderData } = useUserContext();
  const [title, setTitle] = useState<string>("");
  const handleUpdate = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  const updateForm = useDebounce(() => {
    setFormBuilderData((prev) => ({ ...prev, form_title: title }));
  }, 500);
  useEffect(() => {
    updateForm();
  }, [title]);
  useEffect(() => {
    setTitle(formBuilderData.form_title);
  }, [formBuilderData.form_title]);
  const { handleShare } = useAddQuestion();
  return (
    <div className="border-b border-t-0 max-md:fixed max-md:top-0 backdrop-blur-lg bg-white z-10 flex p-2 max-md:px-2 px-6 gap-4 items-center justify-between w-full">
      <Input
        aria-label="form title"
        value={title}
        onChange={handleUpdate}
        variant={"other"}
        className="  max-md:text-sm md:text-base"
        placeholder={"Untitled form"}
      />
      <div className=" flex items-center gap-1">
        <Link href={"/preview"} target="_blank">
          <Button
            disabled={formBuilderData.questions.length == 0}
            size="sm"
            className="shadow-none gap-0.5"
            variant="outline"
          >
            <p>Preview</p>
            <RightArrow />
          </Button>
        </Link>
        <Button
          onClick={handleShare}
          disabled={!formBuilderData.publish}
          size="sm"
          className="shadow-none md:hidden gap-0.5"
          variant="outline"
        >
          <ShareIcon className=" size-4" />
        </Button>
      </div>
    </div>
  );
}

const FormHeader = React.memo(FormHeaderComp);

export default FormHeader;
