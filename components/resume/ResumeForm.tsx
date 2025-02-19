"use client";
import React, { useState } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import SummaryForm from "@/components/forms/SummaryForm";
import ExperienceForm from "@/components/forms/ExperienceForm";
import EducationForm from "@/components/forms/EducationForm";
import SkillsForm from "@/components/forms/SkillsForm";
import ProjectForm from "@/components/forms/ProjectForm";
import CertificateForm from "@/components/forms/CertificateForm";
import LanguageForm from "@/components/forms/LanguageForm";

const ResumeForm = () => {
  const { resumeInfo } = useResumeContext();
  const [activeFormIndex, setActiveFormIndex] = useState(1);

  const handleNext = () => {
    const newIndex = activeFormIndex + 1;
    setActiveFormIndex(newIndex);
  };
  return (
    <div
      className="flex-1 w-full lg:sticky
  lg:top-16
  "
    >
      <div
        className="shadow-md rounded-md bg-white
      !border-t-primary !border-t-4 
      dark:bg-card dark:border
      dark:border-gray-800
      "
      >
        <div
          className="
        flex items-center gap-1
        px-3 justify-end
        border-b py-[7px] min-h-10
        "
        >
          {activeFormIndex > 1 && (
            <Button
              variant="outline"
              size="default"
              className="!px-2 !py-1 !h-auto"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft size="16px" />
              Previous
            </Button>
          )}

          <Button
            variant="outline"
            size="default"
            className="!px-2 !py-1 !h-auto"
            disabled={
              activeFormIndex === 8 || resumeInfo?.status === "archived"
                ? true
                : false
            }
            onClick={handleNext}
          >
            Next
            <ArrowRight size="16px" />
          </Button>
        </div>
        <div className="px-5 py-3 pb-5">
          {/* {PersonalInfo Form} */}
          {activeFormIndex === 1 && (
            <PersonalInfoForm handleNext={handleNext} />
          )}

          {activeFormIndex === 2 && <SummaryForm handleNext={handleNext} />}

          {/* {Eduncational Info} */}
          {activeFormIndex === 3 && <EducationForm handleNext={handleNext} />}

          {/* {Professional Exp.} */}
          {activeFormIndex === 4 && <ExperienceForm handleNext={handleNext} />}

          {/* {Projects} */}
          {activeFormIndex === 5 && <ProjectForm handleNext={handleNext} />}

          {/* {Skills} */}
          {activeFormIndex === 6 && <SkillsForm handleNext={handleNext} />}

          {/* {Certificates} */}
          {activeFormIndex === 7 && <CertificateForm handleNext={handleNext} />}

          {/* {Languages} */}
          {activeFormIndex === 8 && <LanguageForm />}

        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
