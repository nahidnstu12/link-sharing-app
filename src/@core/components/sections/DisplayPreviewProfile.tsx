"use client";
import useAuthContext from "@/@core/hook/useAuthContext";
import { DisplayProfileProps } from "@/@core/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

/**
 * DisplayPreviewProfile renders the user's profile image, name, and email.
 */

const DisplayPreviewProfile = (): JSX.Element | null => {
  const { authUser } = useAuthContext();
  const pathname = usePathname();
  const isPreviewPage = pathname === "/preview";

  const nameIsEmpty = authUser.first_name === "" && authUser.last_name === "";

  return (
    <div className="relative h-full w-full">
      {authUser?.photo_path && (
        <div className="absolute top-5 left-12 w-[108px] h-[108px] border-4 border-dark-purple rounded-full flex justify-center items-center bg-white">
          <Image
            src={typeof authUser.photo_path === "string" ? authUser.photo_path : ""}
            alt="Profile"
            width={100}
            height={100}
            className="w-[100px] h-[100px] object-cover rounded-full"
          />
        </div>
      )}
      {!nameIsEmpty && (
        <div className="absolute top-[140px] right-[-24px] w-[250px]">
          <div className="flex justify-center h-9 bg-white">
            <p
              className={` text-dark-gray font-semibold capitalize truncate ${
                !isPreviewPage ? "text-lg" : "text-2xl	"
              }`}
            >
              {authUser.first_name}&nbsp;{authUser.last_name}
            </p>
          </div>
        </div>
      )}
      {authUser.email && (
        <div
          className={`absolute left-6 w-[150px] h-7 bg-white text-sm font-normal  max-w-[200px] ${
            !isPreviewPage ? "top-[170px]" : "top-[185px]"
          }`}
        >
          <div className="flex justify-center items-centern ">
            <p className="truncate">{authUser.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPreviewProfile;
