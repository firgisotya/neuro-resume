import React, { useCallback, useEffect } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { Button } from "@/components/ui/button";
import { Loader, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useUpdateDocument from "@/features/document/use-update-document";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "@/hooks/use-toast";

const initialState = {
  id: undefined,
  docId: undefined,
  name: "",
  proficiency: "Elementary Proficiency",
};

const LanguageForm = () => {
  const { resumeInfo, onUpdate } = useResumeContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const [languageList, setLanguageList] = React.useState(() => {
    return resumeInfo?.languages?.length
      ? resumeInfo.languages
      : [initialState];
  });

  useEffect(() => {
    if (!resumeInfo) return;
    onUpdate({
      ...resumeInfo,
      languages: languageList,
    });
  }, [languageList]);

  const handleChange = (
    e: { target: { name: string; value: string } },
    index: number
  ) => {
    const { name, value } = e.target;

    setLanguageList((prevState) => {
      const newLanguageList = [...prevState];
      newLanguageList[index] = {
        ...newLanguageList[index],
        [name]: value,
      };
      return newLanguageList;
    });
  };

  const handleProficiencyChange = (value: string, index: number) => {
    setLanguageList((prevState) => {
      const newLanguageList = [...prevState];
      newLanguageList[index].proficiency = value;
      return newLanguageList;
    });
  };

  const addNewLanguage = () => {
    setLanguageList([...languageList, initialState]);
  };

  const removeLanguage = (index: number) => {
    const updatedLanguage = [...languageList];
    updatedLanguage.splice(index, 1);
    setLanguageList(updatedLanguage);
  };

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      const thumbnail = await generateThumbnail();
      const currentNo = resumeInfo?.currentPosition
        ? resumeInfo.currentPosition + 1
        : 1;

      await mutateAsync(
        {
          currentPosition: currentNo,
          thumbnail: thumbnail,
          language: languageList,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Languages updated successfully",
            });
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to update language",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo, languageList]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Languages</h2>
        <p className="text-sm">Add your languages here</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className="border w-full h-auto
              divide-y-[1px] rounded-md px-3 pb-4 my-5
              "
        >
          {languageList?.map((item, index) => (
            <div key={index}>
              <div
                className="relative grid 
                  grid-cols-2 mb-5 pt-4 gap-3
              "
              >
                {languageList?.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    className="size-[20px] text-center
                              rounded-full absolute -top-3 -right-5
                              !bg-black dark:!bg-gray-600 text-white
                              "
                    size="icon"
                    onClick={() => removeLanguage(index)}
                  >
                    <X size="13px" />
                  </Button>
                )}

                <div>
                  <Label className="text-sm">Language</Label>
                  <Input
                    name="name"
                    placeholder=""
                    required
                    value={item?.name || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div>
                  <Label className="text-sm">Proficiency</Label>
                  <Select value={item?.proficiency || undefined} onValueChange={(value) => handleProficiencyChange(value, index)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Elementary Proficiency">Elementary Proficiency</SelectItem>
                      <SelectItem value="Limited Working Proficiency">Limited Working Proficiency</SelectItem>
                      <SelectItem value="Professional Working Proficiency">Professional Working Proficiency</SelectItem>
                      <SelectItem value="Full Professional Proficiency">Full Professional Proficiency</SelectItem>
                      <SelectItem value="Native or Bilingual Proficiency">Native or Bilingual Proficiency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {index === languageList.length - 1 &&
                languageList.length < 5 && (
                  <Button
                    className="gap-1 mt-1 text-primary 
                          border-primary/50"
                    variant="outline"
                    type="button"
                    onClick={addNewLanguage}
                  >
                    <Plus size="15px" />
                    Add More Language
                  </Button>
                )}
            </div>
          ))}
        </div>
        <Button className="mt-4" type="submit" disabled={isPending}>
          {isPending && <Loader size="15px" className="animate-spin" />}
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default LanguageForm;
