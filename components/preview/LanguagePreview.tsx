import SkeletonLoader from "@/components/skeleton-loader";
import { ResumeDataType } from "@/types/resume.type";
import React, { FC } from "react";
import { formatMonthYear } from "@/lib/utils";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const LanguagePreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="w-full my-5">
      <h2 className="text-lg font-bold">LANGUAGES</h2>
      <hr className="border border-y-2 border-gray-700 dark:border-gray-300 my-1" />

      <div className="flex flex-col gap-2 min-h-9">
        {resumeInfo?.languages?.map((language, index) => (
          <div key={index}>
            <h5 className="text-[15px] font-bold">{language?.name}</h5>

            <h5 className="text-[13px] mb-2">{language?.proficiency}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagePreview;
