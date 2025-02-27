"use client";
import React, { useState } from "react";
import { TEMPLATES, INITIAL_TEMPLATE } from "@/constant/template";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface TemplateResumeProps {
  isOpen: boolean;
  onSelect: (template: string) => void;
  onClose: () => void;
}

const TemplateResume: React.FC<TemplateResumeProps> = ({ isOpen, onSelect, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(INITIAL_TEMPLATE);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Select a Template</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          {TEMPLATES.map((template) => (
            // card
            <div
              key={template.name}
              className={`p-3 rounded-lg-border transition relative ${selectedTemplate === template.name ? "border-primary bg-gray-200 dark:bg-gray-700" : "border-gray-300"} cursor-pointer`}
              onClick={() => setSelectedTemplate(template.name)}
            >
              {selectedTemplate === template.name && (
                <span className="absolute top-2 right-2 text-primary font-bold">✔</span>
              )}
              <img src={template.image} alt={template.name} />
              <p className="text-center mt-2 text-sm font-semibold">{template.name}</p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSelect(selectedTemplate)}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateResume;
