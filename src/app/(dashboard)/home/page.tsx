"use client";
import withAuth from "@/@core/components/common/WithAuth";
import MainLayout from "@/@core/components/sections/MainLayout";
import MobileContainer from "@/@core/components/sections/MobileContainer";
import SettingContainer from "@/@core/components/sections/SettingContainer";

import useIsAuth from "@/@core/hook/useAuth";

import React from "react";

const Home: React.FC = (): JSX.Element => {
  const { authUser } = useIsAuth();

  return (
    <MainLayout>
      <div className="flex gap-5 mx-auto sm:w-[95%]">
        <div className=" lg:flex lg:justify-center bg-white w-[45%] hidden rounded-lg mb-6">
          <MobileContainer />
        </div>

        <div className="bg-white w-full lg:w-[60%] rounded-lg mb-6">
          <SettingContainer />
        </div>
      </div>
    </MainLayout>
  );
};

export default withAuth(Home);
