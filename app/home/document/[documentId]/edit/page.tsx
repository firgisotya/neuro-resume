import React from "react";
import { ResumeInfoProvider } from "@/context/resume-info-provider";
import EditResume from "@/components/resume/EditResume";

const Page = () => {
  return (
    <ResumeInfoProvider>
      <EditResume />
    </ResumeInfoProvider>
  );
};

export default Page;