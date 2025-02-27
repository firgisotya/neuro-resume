import React, { useCallback, useEffect, useState } from "react";
import { Loader, Plus, X } from "lucide-react";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "@/hooks/use-toast";
import { ResumeDataType } from "@/types/resume.type";

interface SkillType {
  skill: string;
}

const SkillForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, onUpdate } = useResumeContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<SkillType | null>(null);

  const handleChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const resumeDataInfo = resumeInfo as ResumeDataType;
    const updatedInfo = {
      ...resumeDataInfo,
      skill: value,
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
          skill: resumeInfo?.skill,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Skill updated successfully",
            });
            handleNext();
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to update skill",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo]
  );

  return (
    <div>
      <div className="w-full mb-5">
        <h2 className="font-bold text-lg">Skill</h2>
        <p className="text-sm">Add skill to your resume</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-end justify-between">
            <Label>Add Skill</Label>
          </div>
          <Textarea
            className="mt-5 min-h-36"
            required
            placeholder="List your skills separated by commas..."
            value={resumeInfo?.skill || ""}
            onChange={handleChange}
          />

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

export default SkillForm;
