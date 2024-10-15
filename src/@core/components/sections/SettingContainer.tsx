"use client";

import { useState } from "react";
import { useLinks } from "../../hook/useLinks";
import DisplayLinkWrapper from "../wrapper/DisplayLinkWrapper";
import AddEditLink from "./AddEditLink";
import EmptySetting from "./EmptySetting";
import Button from "../common/Button";

/**
 * SettingContainer component renders the link settings form and handles form submission.
 **/

const SettingContainer = (): JSX.Element => {
  const [openForm, setOpenForm] = useState(false);
  const { links } = useLinks();
  const containerClass = links && links.length > 2 ? "overflow-y-auto " : "";
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  console.log("SettingContainer>>", links);

  return (
    <div className="w-full h-full p-7 sm:p-10">
      <h1 className="text-titleSmall sm:text-title text-black mb-4">
        Customize your links
      </h1>
      <p className="mb-6">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <div className="mb-6">
        <Button
          label={"+ Add new link"}
          onClick={() => {
            setOpenForm((prev) => !prev);
          }}
        />
      </div>
      {/* ADD LINK COMPONENT */}
      {openForm && <AddEditLink closeForm={handleCloseForm} />}

      <div className={`${containerClass} flex flex-col gap-6 h-[470px] `}>
        {links && links.length > 0 ? (
          links.map((item: any, index: number) => (
            <DisplayLinkWrapper
              key={`${item._id}`}
              item={item}
              number={index}
            />
          ))
        ) : (
          <EmptySetting />
        )}
      </div>
      {/* <div className="flex justify-end w-full border-t mt-6 ">
          <div className="w-full sm:w-[91px] mt-6 ">
            <Button label={"Save"} />
          </div>
        </div> */}
    </div>
  );
};

export default SettingContainer;
