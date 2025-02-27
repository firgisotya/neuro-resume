"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import { AIChatSession } from "@/lib/gemini";
import { generateThumbnail } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";
import { Loader, Sparkles } from "lucide-react";
import React, { useCallback, useState } from "react";

interface SummaryType {
  experienceLevel: string;
  summary: string;
}

const prompt = `Job Title: {jobTitle}. Based on the job title, please generate concise 
and complete summaries for my resume in JSON format, incorporating the following experience
levels: fresher, mid, and experienced. Each summary should be limited to 3 to 4 lines,
reflecting a personal tone and showcasing specific relevant programming languages, technologies,
frameworks, and methodologies without any placeholders or gaps. Ensure that the summaries are
engaging and tailored to highlight unique strengths, aspirations, and contributions to collaborative
projects, demonstrating a clear understanding of the role and industry standards.`;

const SummaryForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, onUpdate } = useResumeContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState<
    SummaryType[] | null
  >(null);

  const handleChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const resumeDataInfo = resumeInfo as ResumeDataType;
    const updatedInfo = {
      ...resumeDataInfo,
      summary: value,
    };
    onUpdate(updatedInfo);
  };

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!resumeInfo) return;
      const thumbnail = await generateThumbnail();
      const currentNo = resumeInfo?.currentPosition
        ? resumeInfo?.currentPosition + 1
        : 1;

      await mutateAsync(
        {
          currentPosition: currentNo,
          thumbnail: thumbnail,
          summary: resumeInfo?.summary,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Summary updated successfully",
            });
            handleNext();
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to update summary",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo]
  );

  const GenerateSummaryFromAI = async () => {
    try {
      const jobTitle = resumeInfo?.personalInfo?.jobTitle;
      if (!jobTitle) return;
      setLoading(true);
      const PROMPT = prompt.replace("{jobTitle}", jobTitle);
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      const parsedResponse = JSON.parse(responseText);
      if (
        !parsedResponse.summaries ||
        !Array.isArray(parsedResponse.summaries) ||
        !parsedResponse.summaries.every(
          (summary: any) =>
            typeof summary.experienceLevel === "string" &&
            typeof summary.summary === "string"
        )
      ) {
        throw new Error("Invalid response structure");
      }
      setAiGeneratedSummary(parsedResponse.summaries);
    } catch (error) {
      toast({
        title: "Failed to generate summary",
        description:
          "The AI response was invalid. Please try generating again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = useCallback(
    (summary: string) => {
      if (!resumeInfo) return;
      const resumeDataInfo = resumeInfo as ResumeDataType;
      const updatedInfo = {
        ...resumeDataInfo,
        summary: summary,
      };
      onUpdate(updatedInfo);
      setAiGeneratedSummary(null);
    },
    [onUpdate, resumeInfo]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Summary</h2>
        <p className="text-sm">Add summary for your resume</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-end justify-between">
            <Label>Add Summary</Label>
            <Button
              variant="outline"
              type="button"
              className="gap-1"
              disabled={loading || isPending}
              onClick={() => GenerateSummaryFromAI()}
            >
              <Sparkles size="15px" className="text-purple-500" />
              Generate with AI
            </Button>
          </div>
          <Textarea
            className="mt-5 min-h-36"
            required
            value={resumeInfo?.summary || ""}
            onChange={handleChange}
          />

          {aiGeneratedSummary && (
            <div>
              <h5 className="font-semibold text-[15px] my-4">Suggestions</h5>
              {aiGeneratedSummary?.map(
                ({ experienceLevel, summary }, index) => (
                  <Card
                    role="button"
                    key={index}
                    className="my-4 bg-primary/5 shadow-none border-primary/30"
                    onClick={() => handleSelect(summary)}
                  >
                    <CardHeader className="py-2">
                      <CardTitle className="font-semibold text-md">
                        {experienceLevel.charAt(0).toUpperCase() +
                          experienceLevel.slice(1)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>{summary}</p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          )}

          <Button
            className="mt-4"
            type="submit"
            disabled={
              isPending || loading || resumeInfo?.status === "archived"
                ? true
                : false
            }
          >
            {isPending && <Loader size="15px" className="animate-spin" />}
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SummaryForm;
