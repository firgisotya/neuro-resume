"use client";
import { FC, useEffect, useState } from "react";
import { ResumeDataType } from "@/types/resume.type";
import { Loader } from "lucide-react";
import MinimalistTemplate from "@/components/templates/MinimalistTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ProfessionalTemplate from "@/components/templates/ProfessionalTemplate";

interface ResumeProps {
  data: ResumeDataType | undefined;
  isLoading: boolean;
}

const TEMPLATE_COMPONENTS: Record<string, any> = {
    Minimalist: MinimalistTemplate,
    Modern: ModernTemplate,
    Professional: ProfessionalTemplate,
}

const Resume: FC<ResumeProps> = ({ data, isLoading }) => {
    const [selectedTemplate, setSelectedTemplate] = useState<string>("Minimalist");
    
    useEffect(() => {
      if (data?.template) {
        setSelectedTemplate(data.template);
      }
    }, [data]);
    
    const TemplateComponent = TEMPLATE_COMPONENTS[selectedTemplate] || TEMPLATE_COMPONENTS["Minimalist"];
  
    if (isLoading) {
      return <Loader size="48px" className="animate-spin" />;
    }
  
    return <TemplateComponent data={data} isLoading={isLoading} />;
  };

export default Resume;
