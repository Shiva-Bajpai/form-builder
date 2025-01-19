import React, { useCallback, useEffect, useRef, useState } from "react";
import TickIcon from "@/components/icons/TickIcon";
import { Button } from "@/components/ui/button";
import DraftIcon from "@/components/icons/DraftIcon";
import { AddQuestions } from "./AddQuestions";
import { useUserContext } from "@/store/userStore";
import api from "@/lib/api";
import { validateFormStructure } from "@/validation/formStructureValidation";
import { LoaderCircle } from "lucide-react";
import useDebounce from "@/app/hooks/useDebounce";
import { toast } from "sonner";
function FormFooterComp() {
  const { formBuilderData, setFormBuilderData } = useUserContext();
  const [draft, setDraft] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [publishLoader, setPublishLoader] = useState<boolean>(false);
  const saveFormController = useRef<AbortController | null>(null);
  const firstRender = useRef<boolean>(true);
  const handlePublish = useCallback(async () => {
    setPublishLoader(true);
    const res = await api.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/form/publish${
        formBuilderData.publish ? "?type=un" : ""
      }`,
      {
        headers: {
          form: formBuilderData._id || "",
        },
        credentials: "include",
      }
    );
    setPublishLoader(false);
    if (res.success) {
      setFormBuilderData((prev) => ({
        ...prev,
        publish: (res.data as any).publish,
        _id: (res.data as any)._id,
      }));
      toast.success((res.data as any).message, {
        style: {
          backgroundColor: "#00AA45",
          color: "#FFFFFF",
        },
      });
    }
  }, [formBuilderData, setFormBuilderData]);

  const saveForm = useCallback(async () => {
    const form = validateFormStructure(formBuilderData.questions);
    if (form.errors) {
      console.log(form.errors);
      return;
    }
    setLoader(true);
    if (saveFormController.current) {
      saveFormController.current.abort();
    }

    const controller = new AbortController();
    saveFormController.current = controller;
    const res = await api.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/form/save`,
      formBuilderData,
      {
        showErrorToast: false,
        signal: controller.signal,
        credentials: "include",
      }
    );
    if (res.success) {
      setFormBuilderData((prev) => ({
        ...prev,
        _id: res.data as any,
      }));
      setDraft(true);
    }
    if (res.error) {
      setDraft(false);
    }
    setLoader(false);
  }, [setFormBuilderData, formBuilderData]);
  // const saveFromRealtime = useDebounce(saveForm);
  useEffect(() => {
    if (formBuilderData.questions.length === 0) return;
    if (firstRender.current && formBuilderData.questions) {
      firstRender.current = false;
      return;
    }
    setDraft(false);
    saveForm().then(() => {});
  }, [formBuilderData.questions, formBuilderData.form_title]);
  return (
    <div className="bg-peerlistBackground  border-t border-b-0 flex p-4 px-6 max-md:px-2 gap-1.5 max-md:fixed max-md:bottom-0 backdrop-blur-lg bg-white z-10 items-center justify-between w-full">
      <Button
        onClick={saveForm}
        disabled={loader || formBuilderData.questions.length == 0 || draft}
        size="sm"
        className="gap-0.5"
        variant="outline"
      >
        {loader ? (
          <LoaderCircle className="  size-4 text-peerlistGreen animate-spin" />
        ) : (
          <DraftIcon />
        )}
        Save changes
      </Button>
      {formBuilderData.questions.length >= 3 && <AddQuestions />}
      <Button
        onClick={handlePublish}
        disabled={
          formBuilderData.questions.length == 0 || !draft || publishLoader
        }
        size="sm"
        className="gap-0.5"
        variant={!formBuilderData.publish ? "peerlist" : "destructive"}
      >
        {publishLoader ? (
          <LoaderCircle className="  size-4 animate-spin" />
        ) : (
          <>{!formBuilderData.publish && <TickIcon />}</>
        )}

        {!formBuilderData.publish ? "Publish" : "Unpublish"}
      </Button>
    </div>
  );
}
const FormFooter = React.memo(FormFooterComp);
export default FormFooter;
