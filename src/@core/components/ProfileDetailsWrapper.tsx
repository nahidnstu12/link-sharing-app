"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ProfileDetailsWrapperProps } from "../types";
import Input from "./Input";

/**
 * ProfileDetailsWrapper renders input fields for editing user profile details.
 */

const ProfileDetailsWrapper: React.FC<ProfileDetailsWrapperProps> = ({
  profile,
  handleChange,
  profilErrors,
}: ProfileDetailsWrapperProps): JSX.Element => {
  const methods = useForm({});
  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    console.log("Form data:", data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 bg-background-white p-5 rounded-lg">
          <div className="flex flex-col sm:items-center sm:flex-row gap-1 sm:gap-10">
            <Input
              name="first_name"
              label="First Name"
              placeholder="e.g. jon"
              type="text"
              iconSrc={""}
            />
          </div>
          <div className="flex flex-col sm:items-center sm:flex-row gap-1 sm:gap-10">
            <Input
              name="last_name"
              label="Last Name"
              placeholder="e.g. Doe"
              type="text"
              iconSrc={""}
            />
          </div>
          <div className="flex flex-col sm:items-center sm:flex-row gap-1 sm:gap-10">
            <Input
              name="email"
              label="Email address"
              placeholder="e.g. alex@email.com"
              type="text"
              iconSrc={""}
              autoComplete="email"
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfileDetailsWrapper;
