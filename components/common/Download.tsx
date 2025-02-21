"use client";
import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { DownloadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { formatFileName } from "@/lib/helper";
import { useResumeContext } from "@/context/resume-info-provider";
import Resume from "@/components/preview/pdf";

const Download = (props: { title: string; isLoading: boolean }) => {
  const { title, isLoading } = props;
  const { resumeInfo } = useResumeContext();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!resumeInfo) {
      toast({
        title: "Error",
        description: "No resume data available",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const fileName = formatFileName(title);

    try {
      // Generate PDF as Blob
      const blob = await pdf(<Resume isLoading={isLoading} data={resumeInfo} />).toBlob();
      const url = URL.createObjectURL(blob);

      // Create a link element and trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading || loading}
      variant="secondary"
      className="bg-white border gap-1 dark:bg-gray-800 !p-2 min-w-9 lg:min-w-auto lg:p-4"
      onClick={handleDownload}
    >
      <div className="flex items-center gap-1">
        <DownloadCloud size="17px" />
        <span className="hidden lg:flex">
          {loading ? "Generating PDF..." : "Download Resume"}
        </span>
      </div>
    </Button>
  );
};

export default Download;
