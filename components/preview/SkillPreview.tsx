import React, { FC } from "react";
import SkeletonLoader from "@/components/skeleton-loader";
import { ResumeDataType } from "@/types/resume.type";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const SkillPreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="w-full my-5">
      <h2 className="text-lg font-bold">SKILLS</h2>
      <hr className="border border-y-2 border-gray-700 dark:border-gray-300 my-1" />

      <h5 className="text-[13px] mb-2">{resumeInfo?.skill}</h5>
    </div>
  );
};

export default SkillPreview;
