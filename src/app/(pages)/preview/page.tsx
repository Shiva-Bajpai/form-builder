import RenderSubmissionForm from "@/components/RenderSubmissionForm";
import api from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { formResponse } from "../form/[id]/page";

async function page() {
  const guest_token = cookies().get("guest_token")?.value;
  if (!guest_token) redirect("/create");
  const response = await api.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/form/preview`,
    {
      showErrorToast: false,
      headers: {
        Authorization: `Bearer ${guest_token}`,
        form: cookies().get("guest_form")?.value || "",
      },
      cache: "no-cache",
    }
  );

  if (response.error)
    return (
      <div className=" flex items-center col-span-4 justify-center h-screen">
        Error: {response.error}
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
