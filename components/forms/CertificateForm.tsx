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
  issuer: "",
  issueDate: "",
};

const CertificateForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, onUpdate } = useResumeContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const [certificateList, setCertificateList] = React.useState(() => {
    return resumeInfo?.certificates?.length
      ? resumeInfo.certificates
      : [initialState];
  });

  useEffect(() => {
    if (!resumeInfo) return;
    onUpdate({
      ...resumeInfo,
      certificates: certificateList,
    });
  }, [certificateList]);

  const handleChange = (
    e: { target: { name: string; value: string } },
    index: number
  ) => {
    const { name, value } = e.target;

    setCertificateList((prevState) => {
      const newCertificateList = [...prevState];
      newCertificateList[index] = {
        ...newCertificateList[index],
        [name]: value,
      };
      return newCertificateList;
    });
  };

  const addNewCertificate = () => {
    setCertificateList([...certificateList, initialState]);
  };

  const removeCertificate = (index: number) => {
    const updatedCertificate = [...certificateList];
    updatedCertificate.splice(index, 1);
    setCertificateList(updatedCertificate);
  };

  const handEditor = (value: string, name: string, index: number) => {
    setCertificateList((prevState) => {
      const newCertificateList = [...prevState];
      newCertificateList[index] = {
        ...newCertificateList[index],
        [name]: value,
      };
      return newCertificateList;
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
          certificate: certificateList,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Certificates updated successfully",
            });
            handleNext();
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to update certificate",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo, certificateList]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Certificates</h2>
        <p className="text-sm">Add your certificates here</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className="border w-full h-auto
              divide-y-[1px] rounded-md px-3 pb-4 my-5
              "
        >
          {certificateList?.map((item, index) => (
            <div key={index}>
              <div
                className="relative grid 
                  grid-cols-2 mb-5 pt-4 gap-3
              "
              >
                {certificateList?.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    className="size-[20px] text-center
                              rounded-full absolute -top-3 -right-5
                              !bg-black dark:!bg-gray-600 text-white
                              "
                    size="icon"
                    onClick={() => removeCertificate(index)}
                  >
                    <X size="13px" />
                  </Button>
                )}

                <div className="col-span-2">
                  <Label className="text-sm">Certificate title</Label>
                  <Input
                    name="title"
                    placeholder=""
                    required
                    value={item?.title || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div>
                  <Label className="text-sm">Issuing Organization</Label>
                  <Input
                    name="issuer"
                    placeholder=""
                    required
                    value={item?.issuer || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className="">
                    <Label className="text-sm">Issuance date</Label>
                    <Input
                        name="issueDate"
                        type="month"
                        placeholder=""
                        required
                        value={item?.issueDate || ""}
                        onChange={(e) => handleChange(e, index)}
                    />
                </div>
              </div>

              {index === certificateList.length - 1 &&
                certificateList.length < 5 && (
                  <Button
                    className="gap-1 mt-1 text-primary 
                          border-primary/50"
                    variant="outline"
                    type="button"
                    onClick={addNewCertificate}
                  >
                    <Plus size="15px" />
                    Add More Certificate
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

export default CertificateForm;
