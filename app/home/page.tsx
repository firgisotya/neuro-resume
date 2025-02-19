import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/common/Header";
import AddResume from "@/components/resume/AddResume";
import ResumeList from "@/components/resume/ResumeList";
import TrashListBox from "@/components/resume/TrashListBox";

const Page = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/");
  }

  return (
    <>
      <div
        className="w-full h-auto min-h-screen
     !bg-[#f8f8f8] dark:!bg-background"
      >
        <Header />
        <div className="w-full">
          <div className="w-full mx-auto max-w-7xl py-5 px-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">Resume Builder</h1>
                <p className="text-base dark:text-inherit">
                  Create your own custom resume with AI
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-3">
                {/* {Trash List} */}
                <TrashListBox />
              </div>
            </div>

            <div className="w-full pt-11">
              <h5
                className="text-xl font-semibold dark:text-inherit
          mb-3
          "
              >
                All Resume
              </h5>
              <div className="flex flex-wrap w-full gap-5">
                <AddResume />
                <ResumeList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
