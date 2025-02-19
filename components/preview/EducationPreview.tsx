import React, { FC } from "react";
import SkeletonLoader from "@/components/skeleton-loader";
import { ResumeDataType } from "@/types/resume.type";
import { formatMonthYear } from "@/lib/utils";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const EducationPreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {

  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="w-full mb-5">
      <h2 className="text-lg font-bold">EDUCATION</h2>
      <hr className="border border-y-2 border-gray-700 dark:border-gray-300 my-1" />

      <div className="flex flex-col gap-2 min-h-9">
        {resumeInfo?.educations?.map((education, index) => (
          <div key={index}>
            
            <div className="flex items-start justify-between">
              <h5 className="text-sm font-bold">
                {education?.degree}
                {education?.degree && education?.major && " in "}
                {education?.major}
              </h5>
              <span className="text-[13px]">
                {formatMonthYear(education?.startDate) || ""} -{" "}
                {formatMonthYear(education?.endDate) || "Present"}
              </span>
            </div>
            <h5 className="text-[13px]">
              {education?.universityName}
            </h5>
            <div
              style={{ 
                fontSize: "13px",
                
               }}
              className="edu-preview leading-[14.6px] my-2"
              dangerouslySetInnerHTML={{
                __html: education?.description || "",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationPreview;
