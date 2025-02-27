import React, { useState } from "react";
import {
  EditorProvider,
  Editor,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
} from "react-simple-wysiwyg";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AIChatSession } from "@/lib/gemini";
import { getPrompt } from "@/lib/prompt-templates";

interface RichTextEditorProps {
  label?: string;
  jobTitle?: string | null;
  degree?: string | null;
  fieldOfStudy?: string | null;
  projectTitle?: string | null;
  technologies?: string | null;
  initialValue?: string;
  onEditorChange: (value: string) => void;
  promptKey: "experience" | "education" | "summary" | "project";
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label = "Text Editor",
  jobTitle,
  degree,
  fieldOfStudy,
  projectTitle,
  technologies,
  initialValue,
  onEditorChange,
  promptKey, 
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState(initialValue || "");

  const handleEditorChange = (e: any) => {
    setValue(e.target.value);
    onEditorChange(e.target.value);
  };

  const GenerateContentFromAI = async () => {
    try {
      setLoading(true);

      const promptParams: Record<string, string> = {};
      if (jobTitle) promptParams["jobTitle"] = jobTitle;
      if (degree) promptParams["degree"] = degree;
      if (fieldOfStudy) promptParams["fieldOfStudy"] = fieldOfStudy;
      if (projectTitle) promptParams["projectTitle"] = projectTitle;
      if (technologies) promptParams["technologies"] = technologies;

      const prompt = getPrompt(promptKey, promptParams);
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      const validJsonArray = JSON.parse(`[${responseText}]`);

      // jika ada bulletPoints maka ambil isi bulletPoints
      // jika tidak ada bulletPoints maka ambil isi dari validJsonArray
      setValue(validJsonArray?.[0].bulletPoints || validJsonArray?.[0]);
      onEditorChange(validJsonArray?.[0].bulletPoints || validJsonArray?.[0]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to generate content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <Label>{label}</Label>
        {promptKey && (
          <Button
            variant="outline"
            type="button"
            className="gap-1"
            disabled={loading}
            onClick={GenerateContentFromAI}
          >
            <Sparkles size="15px" className="text-purple-500" />
            Generate with AI
            {loading && <Loader size="13px" className="animate-spin" />}
          </Button>
        )}
      </div>

      <EditorProvider>
        <div
          className="prose"
          style={{
            resize: "vertical",
            lineHeight: 1.2,
            fontSize: "13.5px",
          }}
        >
          <Editor value={value} onChange={handleEditorChange}>
            <Toolbar>
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <Separator />
              <BtnNumberedList />
              <BtnBulletList />
              <Separator />
              <BtnLink />
            </Toolbar>
          </Editor>
        </div>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
