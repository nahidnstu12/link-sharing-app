"use client";

import Link from "next/link";

import IconLinkLarge from "@/@core/assets/logo-devlinks-large.tsx";
import Input from "@/@core/components/common/Input";
import { apiPost } from "@/@core/helpers/common-api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Button from "@/@core/components/common/Button";

/**
 * The Login component renders a login form where users can enter their email and password to access their account.
 */

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
});

const Login = (): JSX.Element => {
  const router = useRouter();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    console.log("Form data:", data);
    try {
      const resposne = await apiPost("/login", data);
      console.log("resposne login>>", resposne?.data?.data);

      if (resposne?.data?.status == 200) {
        // Cookies.set("token", resposne?.data?.token!, { expires: 24 });
        toast.success("Login Successful");
        router.push("/home");
      }
    } catch (errors: any) {
      console.error("errors", errors);
      toast.error(errors.response.data.message);
    }
  };

  return (
    <main>
      <section className="flex flex-col bg-white sm:bg-background-white justify-center w-full h-screen">
        <div className=" flex flex-col items-center gap-[51px] w-full px-[8%] sm:px-[0]">
          <div className="w-[130px] h-[40px] lg:w-[183px] lg:h-[40px]">
            <IconLinkLarge className="w-full h-full max-w-full max-h-full" />
          </div>

          <div className="flex flex-col items-start gap-[40px] sm:p-[40px] sm:w-[476px]  bg-white">
            <div className="flex flex-col gap-[24px]">
              <h1 className=" text-titleSmall sm:text-title text-dark-gray">
                Login
              </h1>
              <p>Add your details below to get back into the app</p>
            </div>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[24px] w-full"
              >
                <div className="flex flex-col gap-[24px]">
                  <div>
                    <Input
                      name="email"
                      label="Email address"
                      placeholder="e.g. alex@email.com"
                      type="text"
                      iconSrc={"/images/icon-email.svg"}
                      autoComplete="email"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Input
                      name="password"
                      label="Password"
                      placeholder="At least 8 characters"
                      type="password"
                      iconSrc={"/images/icon-password.svg"}
                    />
                  </div>
                </div>
                <Button label={"Login"} type={"submit"} />
                <p className="text-base px-[5%] sm:px-[10%] text-center ">
                  Don&apos;t have an account?{" "}
                  <Link href="/register">
                    <span className="text-dark-purple">Create account</span>
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

export default Login;
