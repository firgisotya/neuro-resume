import React, { useCallback, useEffect, useState } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { INITIAL_TEMPLATE, TEMPLATES } from "@/constant/template";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Palette, Loader, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/use-debounce";

const TemplateSelector = () => {
  const { resumeInfo, isLoading, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  
  const debouncedTemplate = useDebounce(selectedTemplate, 1000);

  useEffect(() => {
    if (resumeInfo?.template) {
      setSelectedTemplate(resumeInfo.template);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);

  }, [resumeInfo]);

  const onTemplateSelect = useCallback((templateName: string) => {
    setSelectedTemplate(templateName);
  }, []);

  const handleSelectTemplate = useCallback(async () => {
    if (!selectedTemplate || resumeInfo?.template === selectedTemplate) return;
    try {
      const response = await mutateAsync({
        template: selectedTemplate,
      });

      onUpdate({ ...resumeInfo, template: selectedTemplate });
      toast({
        title: "Success",
        description: "Template updated successfully",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update template",
        variant: "destructive",
      });
    }
  }, [resumeInfo, selectedTemplate]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={isLoading || resumeInfo?.status === "archived"}
          variant="secondary"
          className="bg-white border gap-1 dark:bg-gray-800 !p-2 w-9 lg:w-auto lg:p-4"
        >
          <div className="flex items-center gap-1">
            <Palette size="17px" />
            <span className="hidden lg:flex">Template</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl w-full max-h-[90vh] lg:max-h-[95vh] overflow-auto p-4">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
          <DialogDescription>
            Choose a template for your resume
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin" size={24} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4">
              {TEMPLATES.map((template) => (
                <div
                  key={template.name}
                  className={`relative cursor-pointer ${
                    selectedTemplate === template.name
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => onTemplateSelect(template.name)}
                >
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedTemplate === template.name && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <Check size={16} />
                    </div>
                  )}
                  <p className="text-center mt-2 text-sm font-semibold">
                    {template.name}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
        <DialogFooter className="mt-8">
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleSelectTemplate}
              disabled={isPending}
            >
              Save
            </Button>

            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelector;
