import React from "react";
import { ResumeDataType } from "@/types/resume.type";
import { cn } from "@/lib/utils";

const PreviewResume = (props: {
  isLoading: boolean;
  resumeInfo: ResumeDataType;
}) => {
  const { isLoading, resumeInfo } = props;

  return (
    <div
      className={cn(`
        shadow-lg !bg-white w-full flex-[1.02]
        h-full p-10 !font-open-sans
        !text-black
        `)}
    >
      
    </div>
  );
};

export default PreviewResume;
