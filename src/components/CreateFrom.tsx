"use client";
import FormFooter from "@/components/FormFooter";
import FormHeader from "@/components/FormHeader";
import FromBuilder from "@/components/FormBuilder";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "./RightSidebar";

function CreateFrom() {
  return (
    <>
      <LeftSidebar />
      <div className="col-span-2 max-lg:col-span-4 flex flex-col justify-between border-t-0 border-b-0 border h-full">
        {/* Header */}
        <FormHeader />

        {/* form builder */}
        <FromBuilder />

        {/* Footer */}
        <FormFooter />
      </div>
      <RightSidebar />
    </>
  );
}

export default CreateFrom;
