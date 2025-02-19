import React, { useCallback, useEffect } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { Button } from "@/components/ui/button";
import { Loader, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useUpdateDocument from "@/features/document/use-update-document";
import RichTextEditor from "@/components/editor";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "@/hooks/use-toast";

const initialState = {
  id: undefined,
  docId: undefined,
  title: "",
  link: "",
  description: "",
};

const ProjectForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, onUpdate } = useResumeContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const [projectList, setProjectList] = React.useState(() => {
    return resumeInfo?.projects?.length
      ? resumeInfo.projects
      : [initialState];
  });

  useEffect(() => {
    if (!resumeInfo) return;
    onUpdate({
      ...resumeInfo,
      projects: projectList,
    });
  }, [projectList]);

  const handleChange = (
    e: { target: { name: string; value: string } },
    index: number
  ) => {
    const { name, value } = e.target;

    setProjectList((prevState) => {
      const newProjectList = [...prevState];
      newProjectList[index] = {
        ...newProjectList[index],
        [name]: value,
      };
      return newProjectList;
    });
  };

  const addNewProject = () => {
    setProjectList([...projectList, initialState]);
  };

  const removeProject = (index: number) => {
    const updatedProject = [...projectList];
    updatedProject.splice(index, 1);
    setProjectList(updatedProject);
  };

  const handEditor = (value: string, name: string, index: number) => {
    setProjectList((prevState) => {
      const newProjectList = [...prevState];
      newProjectList[index] = {
        ...newProjectList[index],
        [name]: value,
      };
      return newProjectList;
    });
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
          project: projectList,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Experience updated successfully",
            });
            handleNext();
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to update experience",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo, projectList]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Projects</h2>
        <p className="text-sm">Add your projects here</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className="border w-full h-auto
              divide-y-[1px] rounded-md px-3 pb-4 my-5
              "
        >
          {projectList?.map((item, index) => (
            <div key={index}>
              <div
                className="relative grid 
                  grid-cols-2 mb-5 pt-4 gap-3
              "
              >
                {projectList?.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    className="size-[20px] text-center
                              rounded-full absolute -top-3 -right-5
                              !bg-black dark:!bg-gray-600 text-white
                              "
                    size="icon"
                    onClick={() => removeProject(index)}
                  >
                    <X size="13px" />
                  </Button>
                )}

                <div>
                  <Label className="text-sm">Project title</Label>
                  <Input
                    name="title"
                    placeholder=""
                    required
                    value={item?.title || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div>
                  <Label className="text-sm">Project url</Label>
                  <Input
                    name="link"
                    placeholder=""
                    required
                    value={item?.link || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className="col-span-2 mt-1">
                  {/* {Description} */}
                  <RichTextEditor
                    label="Description of the project"
                    projectTitle={item.title}
                    initialValue={item.description || ""}
                    promptKey="project"
                    onEditorChange={(value: string) =>
                      handEditor(value, "description", index)
                    }
                  />
                </div>
              </div>

              {index === projectList.length - 1 &&
                projectList.length < 5 && (
                  <Button
                    className="gap-1 mt-1 text-primary 
                          border-primary/50"
                    variant="outline"
                    type="button"
                    onClick={addNewProject}
                  >
                    <Plus size="15px" />
                    Add More Project
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

export default ProjectForm;
