"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { ResumeDataType } from "@/types/resume.type";
import React, { FC } from "react";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const PersonalInfo: FC<PropsType> = ({ resumeInfo, isLoading }) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="w-full min-h-14">
      <h2
        className="
        font-bold text-xl text-center text-black dark:text-white
      "
      >
        {resumeInfo?.personalInfo?.fullName || "Full Name"}{" "}
      </h2>
      <div className="text-center mb-5 flex flex-row justify-center">
        <a
          href="tel:{resumeInfo?.personalInfo?.phone}"
          className="mx-2 text-black dark:text-white"
        >
          <p className="text-[12px] underline">
            {resumeInfo?.personalInfo?.phone}
          </p>
        </a>{" "}
        <a
          href="mailto:{resumeInfo?.personalInfo?.email}"
          className="mx-2 text-black dark:text-white"
        >
          <p className="text-[12px] underline">
            {resumeInfo?.personalInfo?.email}
          </p>
        </a>{" "}
        <a href="#" className="mx-2 text-black dark:text-white">
          <p className="text-[12px] underline">
            {resumeInfo?.personalInfo?.linkedin}
          </p>
        </a>{" "}
        <a href="#" className="mx-2 text-black dark:text-white">
          <p className="text-[12px] underline">
            {resumeInfo?.personalInfo?.github}
          </p>
        </a>{" "}
        <a href="#" className="mx-2 text-black dark:text-white">
          <p className="text-[12px] underline">
            {resumeInfo?.personalInfo?.portfolio}
          </p>
        </a>
      </div>
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="w-full min-h-14">
      <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
      <Skeleton className="h-6 w-1/4 mx-auto mb-2" />
      <Skeleton className="h-6 w-1/3 mx-auto mb-2" />
      <div className="flex justify-between pt-3">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-[1.5] w-full my-2" />
    </div>
  );
};

export default PersonalInfo;
