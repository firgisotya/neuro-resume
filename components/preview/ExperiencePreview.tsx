import SkeletonLoader from "@/components/skeleton-loader";
import { ResumeDataType } from "@/types/resume.type";
import React, { FC } from "react";
import { formatMonthYear } from "@/lib/utils";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const ExperiencePreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="w-full my-5">
      <h2 className="text-lg font-bold">EXPERIENCE</h2>
      <hr className="border border-y-2 border-gray-700 dark:border-gray-300 my-1" />

      <div className="flex flex-col gap-2 min-h-9">
        {resumeInfo?.experiences?.map((experience, index) => (
          <div key={index}>
            <div
              className="flex items-start 
            justify-between"
            >
              <h5 className="text-[15px] font-bold">{experience?.title}</h5>

              <span className="text-[13px]">
                {formatMonthYear(experience?.startDate) || ""} -{" "}
                {formatMonthYear(experience?.endDate) || "Present"}
              </span>
            </div>
            <h5 className="text-[13px] mb-2">
              {experience?.companyName}
              {experience?.companyName && experience?.city && ", "}
              {experience?.city}
              {experience?.city && experience?.state && ", "}
              {experience?.state}
            </h5>
            <div
              style={{ fontSize: "13px" }}
              className="edu-preview leading-[14.6px]"
              dangerouslySetInnerHTML={{
                __html: experience?.workSummary || "",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePreview;
