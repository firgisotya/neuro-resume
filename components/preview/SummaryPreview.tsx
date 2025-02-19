import { Skeleton } from "@/components/ui/skeleton";
import { ResumeDataType } from "@/types/resume.type";
import React, { FC } from "react";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const SummaryPreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
  return (
    <div className="w-full min-h-10 mt-4">
      {isLoading ? (
        <Skeleton className="h-6 w-full" />
      ) : (
        <>
          <div className="mb-5">
            <h2 className="text-lg font-bold">SUMMARY</h2>
            <hr className="border border-y-2 border-gray-700 dark:border-gray-300 my-1" />
            <p className="text-[13px] !leading-4 mt-2 break-words">
              {resumeInfo?.summary ||
                "Enter a brief description of your profession baground."}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SummaryPreview;
