import RenderSubmissionForm from "@/components/RenderSubmissionForm";
import api from "@/lib/api";
import { formType } from "@/types/types";
import { cookies } from "next/headers";

import React from "react";
export interface formResponse {
  savedForm: formType;
  prevSubmitted: Record<string, string>;
}
async function page({ params }: { params: { id: string } }) {
  const guest_token = cookies().get("guest_token")?.value;

  const response = await api.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/form/info/${params.id}`,
    {
      showErrorToast: false,
      headers: {
        Authorization: `Bearer ${guest_token}`,
      },
      cache: "no-cache",
    }
  );
  if (response.error)
    return (
      <div className=" flex col-span-4 items-center font-semibold justify-center h-screen">
        {response.error}
      </div>
    );

  return (
    <RenderSubmissionForm
      prevSubmitted={(response.data as formResponse).prevSubmitted}
      data={(response.data as formResponse).savedForm}
    />
  );
}

export default page;
