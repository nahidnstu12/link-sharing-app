"use client";

import React, { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CreateLinkProps, LinkDetail, UrlValue } from "../types";
import Input from "./Input";
import PlaformSelectBox from "./PlatformSelectBox";

/**
 * CreateLink renders a form section for creating or editing a link.
 */

const formatText = (name: string): string => {
  return name.replace(/\s+/g, "").toLowerCase();
};
const CreateLink: React.FC<CreateLinkProps> = ({
  link,
  number,
  removeLink,
  removeLinkBack,
  handleChange,
  linkErrors,
}: CreateLinkProps): JSX.Element => {
  const handleDropdownChange = (selectedOption: LinkDetail) => {
    handleChange(number, link.key, "label", selectedOption);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: UrlValue = { url: event.target.value };
    handleChange(number, link.key, "url", value);
  };

  const handleDelete = useCallback(
    (linkKey: string, isLocal: boolean) => {
      if (!isLocal) {
        removeLinkBack(linkKey);
      } else {
        removeLink(linkKey);
      }
    },
    [removeLink, removeLinkBack]
  );

  const errorsForCurrentLink = linkErrors[number] || {};
  const urlError = errorsForCurrentLink.url || "";
  const labelError = errorsForCurrentLink.label || "";

  const methods = useForm({});
  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    console.log("Form data:", data);
  };

  return (
    <div className="bg-background-white w-full p-5 rounded-lg ">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2 items-center">
          <div className="flex justify-start h-2">
            <div className="border-b border-t w-3 h-1.5 border-dark-gray"></div>
          </div>
          <p>{`Link #${number + 1}`}</p>
        </div>
        <p
          className={"cursor-pointer"}
          onClick={() => handleDelete(link.key, !link.isLocal)}
        >
          Remove
        </p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* initialState={link.platform} zIndex={1000 - index} linkId={link.id} */}
          <PlaformSelectBox
            initialState={"Github"}
            zIndex={1000 - number}
            linkId={'1'}
          />
          <div className="mt-4">
            <Input
              name={formatText(link.label)}
              label={"Link"}
              placeholder={`e.g. ${link.url}`}
              type="text"
              iconSrc={"/images/icon-link.svg"}
              autoComplete="off"
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateLink;
