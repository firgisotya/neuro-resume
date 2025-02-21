"use client";
import React from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { PDFViewer } from "@react-pdf/renderer";
import Resume from "@/components/preview/pdf";

const ResumePreview = () => {
  const { resumeInfo, isLoading } = useResumeContext();

  return (
    <div className="relative w-full h-[30rem] flex-[1.02] scrollbar-thin-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thin-slate-700 scrollbar-track-slate-300">
      <PDFViewer
        width="100%"
        height="100%"
        showToolbar={false}
        className="scrollbar-thin-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thin-slate-700 scrollbar-track-slate-300"
      >
        <Resume isLoading={isLoading} data={resumeInfo} />
      </PDFViewer>
    </div>
  );
};

export default ResumePreview;
