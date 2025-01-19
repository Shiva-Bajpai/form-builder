import { Heading } from "@/components/typography/heading";
import { Paragraph } from "./typography/paragraph";
import Image from "next/image";
import { useUserContext } from "@/store/userStore";
const colors = ["text-red-500", "text-green-500", "text-purple-500"];

function RightSidebar() {
  const { formBuilderData, formSubmission } = useUserContext();
  const { handleShare } = useAddQuestion();
  return (
    <div className="col-span-1 max-md:hidden max-lg:hidden h-full w-full flex p-4 items-start justify-start flex-col gap-4">
      <Heading size="tiny" className="px-1 font-semibold">
        Form submissions 🗂️
      </Heading>
      {formSubmission.length === 0 && (
        <>
          <p className="text-[#B489FF] font-bold text-4xl "></p>
          <p className=" font-semibold text-3xl">
            Still waiting for submissions.
          </p>
          {formBuilderData.publish && formBuilderData._id && (
            <ClipboardCopy formId={formBuilderData._id} />
          )}
          <div
            onClick={handleShare}
            aria-disabled={!formBuilderData.publish}
            className="inline-flex cursor-pointer aria-disabled:cursor-not-allowed items-center rounded-lg justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 aria-disabled:opacity-75 h-7 px-4 py-[1.1rem]  mb-2"
          >
            Share Form
          </div>
          <Image
            src={"https://media.tenor.com/OSO8YozpungAAAAi/bt21-rj.gif"}
            height={170}
            className=" mt-2"
            alt="cute gif"
            width={170}
          />
        </>
      )}
      <div className=" flex flex-col w-full hide-scrollbar gap-4 overflow-y-scroll max-h-[calc(100vh-170px)]">
        {formSubmission.map((item, index) => (
          <div
            key={item.userId + index}
            className="p-2 shadow-xs hover:bg-peerlistHoverBackground w-full border gap-3 rounded-lg flex items-center"
          >
            <div className=" w-full">
              <Heading className="text-sm capitalize font-semibold">
                {item.userId.slice(0, 11)}
              </Heading>
              <div className=" flex justify-start items-center w-full">
                <Paragraph size="tiny" className=" text-peerlistBorder">
                  {item.submittedAt}
                </Paragraph>
              </div>
            </div>
            <div
              className={`font-serif text-2xl ${
                index < 3
                  ? colors[index % colors.length]
                  : "text-peerlistBorder"
              }`}
            >
              #{index + 1}
            </div>
          </div>
        ))}
      </div>
      {formSubmission.length > 0 && (
        <div
          onClick={handleShare}
          aria-disabled={!formBuilderData.publish}
          className="inline-flex cursor-pointer aria-disabled:cursor-not-allowed items-center rounded-lg justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 aria-disabled:opacity-75 h-8 px-4 py-[1.1rem] mb-2"
        >
          Share Form
        </div>
      )}
    </div>
  );
}

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import useAddQuestion from "@/app/hooks/useAddQuestion";

interface ClipboardCopyProps {
  formId: string;
}

function ClipboardCopy({ formId }: ClipboardCopyProps) {
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const url = `${window.location.origin}/form/${formId}`;

  const copyToClipboard = async () => {
    if (inputRef.current) {
      inputRef.current.select();
      try {
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <Input
        ref={inputRef}
        type="text"
        value={url}
        readOnly
        variant={"nofilled"}
        className="cursor-pointer py-1 selection:bg-transparent focus-visible:ring-0"
        onClick={copyToClipboard}
      />
      {isCopied && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary text-primary-foreground rounded-md">
          <span className="text-sm font-medium">Copied!</span>
        </div>
      )}
    </div>
  );
}

export default RightSidebar;
