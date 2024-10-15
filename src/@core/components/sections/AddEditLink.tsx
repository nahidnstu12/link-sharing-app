"use client";

import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { platformColorMap } from "../../helpers/utils";
import useAuth from "../../hook/useAuth";
import { useLinks } from "../../hook/useLinks";
import Input from "../common/Input";
import PlaformSelectBox from "../common/PlatformSelectBox";
import Button from "../common/Button";

/**
 * CreateLink renders a form section for creating or editing a link.
 */

interface AddEditLinkProps {
  itemId?: null | string;
  isEditing?: boolean;
  closeForm: () => void;
}
const AddEditLink: React.FC<AddEditLinkProps> = ({
  isEditing,
  itemId,
  closeForm,
}) => {
  const methods = useForm({});
  const { authUser } = useAuth();
  const { addLink, editLink, links } = useLinks();
  const existingLink = links.find((link) => link._id === itemId);

  const { handleSubmit, reset, setValue } = methods;

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
    data.user_id = authUser?._id;
    data.color = platformColorMap[data.platform];
    if (isEditing && itemId) {
      await editLink(itemId, data);
      toast.success("Link updated successfully");
    } else {
      await addLink(data);
      toast.success("Link added successfully");
    }
    closeForm();
  };

  return (
    <div
      className={`flex flex-col gap-6 bg-background-white w-full p-5 rounded-lg mb-4 border border-link-dark-blue `}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PlaformSelectBox
            platformValue={methods.watch("platform")}
            setValue={setValue}
          />
          <div className="mt-4">
            <Input
              name={"link"}
              label={"Link"}
              placeholder={`e.g. github.com/nahid`}
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
