import SkeletonLoader from "@/components/skeleton-loader";
import { ResumeDataType } from "@/types/resume.type";
import React, { FC } from "react";
import { formatMonthYear } from "@/lib/utils";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const CertificatePreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="w-full my-5">
      <h2 className="text-lg font-bold">CERTIFICATES</h2>
      <hr className="border border-y-2 border-gray-700 dark:border-gray-300 my-1" />

      <div className="flex flex-col gap-2 min-h-9">
        {resumeInfo?.certificates?.map((certificate, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <h5 className="text-[15px] font-bold">{certificate?.title}</h5>
              <span className="text-[13px]">
                {formatMonthYear(certificate?.issueDate) || ""}
              </span>
            </div>

            <h5 className="text-[13px] mb-2">{certificate?.issuer}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificatePreview;
