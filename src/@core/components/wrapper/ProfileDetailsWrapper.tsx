"use client";
import useAuthContext from "@/@core/hook/useAuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import Button from "../common/Button";
import Input from "../common/Input";

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First name is required")
    .min(3, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),

  last_name: Yup.string()
    .required("Last name is required")
    .min(3, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

/**
 * ProfileDetailsWrapper renders input fields for editing user profile details.
 */

const ProfileDetailsWrapper = (): JSX.Element => {
  const { authUser, updateProfile } = useAuthContext();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (authUser) {
      reset({
        first_name: authUser?.first_name,
        last_name: authUser?.last_name,
        email: authUser?.email,
      });
    }
  }, [authUser]);

  const onSubmit = async (data: any) => {
    console.log("Form data:", data);
    try {
      await updateProfile(data);
    } catch (err) {
      console.log("errro in updating profile", err);
    }
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
        <div className="flex justify-end w-full border-t my-3 ">
          <div className="w-full sm:w-[91px] mt-6">
            <Button label={"Save"} type={"submit"} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfileDetailsWrapper;
