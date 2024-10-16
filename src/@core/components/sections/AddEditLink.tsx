"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { platformColorMap, platforms } from "../../helpers/utils";
import useAuth from "../../hook/useAuth";
import { useLinks } from "../../hook/useLinks";
import Button from "../common/Button";
import Input from "../common/Input";
import PlaformSelectBox from "../common/PlatformSelectBox";

/**
 * CreateLink renders a form section for creating or editing a link.
 */

interface AddEditLinkProps {
  itemId?: null | string;
  isEditing?: boolean;
  closeForm: () => void;
}
const validationSchema = Yup.object().shape({
  link: Yup.string().url("Invalid url format").required("link is required"),
  platform: Yup.string().nullable(),
});
const AddEditLink: React.FC<AddEditLinkProps> = ({
  isEditing,
  itemId,
  closeForm,
}) => {
  const methods = useForm({ resolver: yupResolver(validationSchema) });
  const { authUser } = useAuth();
  const { addLink, editLink, links } = useLinks();

  const linkedPlatforms = links.map((link) => link.platform);
  const platformOptions = platforms.filter(
    (platform) => !linkedPlatforms.includes(platform)
  );

  const existingLink = links.find((link) => link._id === itemId);

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;
  console.log("errors link addedit>", errors);

  useEffect(() => {
    // Check if we're editing and itemId is provided
    if (isEditing && existingLink) {
      reset({
        platform: existingLink.platform || "Github",
        link: existingLink.link || "",
      });
    }
  }, [isEditing, itemId, reset]);

  const onSubmit = async (data: any) => {
    try {
      console.log("submit data>", data);
      data.platform = data?.platform || platformOptions[0];
      data.user_id = authUser?._id;
      data.color = platformColorMap[data.platform].replace('bg-', '');
      if (isEditing && itemId) {
        await editLink(itemId, data);
        toast.success("Link updated successfully");
      } else {
        await addLink(data);
        toast.success("Link added successfully");
      }
      closeForm();
    } catch (err) {
      console.log("Link create or upddate failed:", err);
    }
  };

  return (
    <div
      className={`flex flex-col gap-6 bg-background-white w-full p-5 rounded-lg mb-4 border border-link-dark-blue `}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PlaformSelectBox
            platformValue={
              (methods.watch("platform") as string) || platformOptions[0]
            }
            setValue={setValue}
            platformOptions={platformOptions}
          />
          <div className="mt-4">
            <Input
              name={"link"}
              label={"Link"}
              placeholder={`e.g. paste your url`}
              type="text"
              iconSrc={"/images/icon-link.svg"}
              autoComplete="off"
            />
          </div>

          <div className="flex justify-end w-full border-t mt-6 gap-4">
            <div className="w-full sm:w-[91px] my-3 ">
              <Button label={"Cancel"} onClick={closeForm} />
            </div>
            <div className="w-full sm:w-[91px] my-3 ">
              <Button label={isEditing ? "Update" : "Save"} type="submit" />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddEditLink;
