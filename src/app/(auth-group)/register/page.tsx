/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";

import IconLinkLarge from "@/@core/assets/logo-devlinks-large.tsx";
import Button from "@/@core/components/common/Button";
import Input from "@/@core/components/common/Input";
import { apiPost } from "@/@core/helpers/common-api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useState } from "react";

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

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
});

/**
 * The SignUp component renders a sign-up form where users can create a new account.
 */

const SignUp = (): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const response = await apiPost("/register", data);
      if (response?.data?.status >= 200) {
        toast.success("Registration Successful");
        router.push("/login");
        setLoading(false);
      }
    } catch (errors: any) {
      console.error("errors", errors);
      setLoading(false);
      toast.error(errors?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <main>
      <section className="flex flex-col bg-white  sm:bg-background-white justify-center w-full h-full">
        <div className=" flex flex-col items-center gap-[51px] w-full px-[5%] sm:px-[0]">
          <div className="w-[130px] h-[40px] lg:w-[183px] lg:h-[40px]">
            <IconLinkLarge className="w-full h-full max-w-full max-h-full" />
          </div>
          <div className="flex flex-col items-start gap-[40px] sm:p-[40px] sm:w-[476px]  bg-white">
            <h1 className=" text-titleSmall sm:text-title text-dark-gray">
              Create account
            </h1>
            <p className="mt-4 mb-8">
              Let's get you started sharing your links!
            </p>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[20px] w-full"
              >
                <div className="input-wrapper">
                  <Input
                    name="first_name"
                    label="First Name"
                    placeholder="e.g. jon"
                    type="text"
                    iconSrc={"/images/icon-user.svg"}
                  />
                </div>
                <div className="input-wrapper">
                  <Input
                    name="last_name"
                    label="Last Name"
                    placeholder="e.g. Doe"
                    type="text"
                    iconSrc={"/images/icon-user.svg"}
                  />
                </div>
                <div className="input-wrapper">
                  <Input
                    name="email"
                    label="Email address"
                    placeholder="e.g. alex@email.com"
                    type="text"
                    iconSrc={"/images/icon-email.svg"}
                    autoComplete="email"
                  />
                </div>
                <div className="input-wrapper">
                  <Input
                    name="password"
                    label="Password"
                    placeholder="At least 8 characters"
                    type="password"
                    iconSrc={"/images/icon-password.svg"}
                  />
                </div>

                <p className="text-xs">
                  Password must contain at least 8 characters
                </p>
                <Button
                  label={"Create a new account"}
                  type={"submit"}
                  isLoading={loading}
                />
                <p className="text-base px-[5%] sm:px-[10%] text-center ">
                  Already have an account?{" "}
                  <Link href="/login">
                    <span className="text-dark-purple">Login</span>
                  </Link>
                </p>
              </form>
            </FormProvider>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
