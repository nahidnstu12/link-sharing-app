"use client";

import IconUploadImage from "@/@core/assets/icon-upload-image.tsx";
import useAuthContext from "@/@core/hook/useAuthContext";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

// const MAX_IMAGE_DIMENSION = 1024;

/**
 * ProfilePictureWrapper allows users to upload and change their profile picture.
 */

const ProfilePictureWrapper = (): JSX.Element => {
  const { authUser, handleFileChange } = useAuthContext();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const havePicture = authUser?.photo_path;

  const textStyles = havePicture
    ? "text-white absolute"
    : "text-dark-purple absolute";
  const iconStyles = havePicture ? "text-white" : "text-dark-purple";

  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center sm:gap-16 gap-4 bg-background-white p-5 rounded-lg">
      <p className="w-[150px]">Profile picture</p>
      <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center content-center gap-6">
        <div
          className="flex flex-col justify-center items-center gap-2 w-[193px] min-w-[193px] min-h-[193px] bg-lightest-purple overflow-hidden cursor-pointer rounded-xl"
          onClick={handleImageClick}
          role="button"
          aria-label="Upload Profile Picture"
        >
          <div className="relative h-[193px] w-[193px] rounded-xl">
            <IconUploadImage
              className={`w-[40px] h-[40px] absolute top-[60px] left-[75px] z-10 ${iconStyles}`}
            />
            {havePicture && (
              // <Image
              //   src={
              //     typeof authUser?.photo_path === "string"
              //       ? `data:base64,${authUser?.photo_path}`
              //       : ""
              //   }
              //   alt="Profile"
              //   width={193}
              //   height={193}
              //   className="absolute z-0 h-[193px] w-[193px] object-cover"
              //   priority
              // />
              <img
                src={
                  typeof authUser?.photo_path === "string"
                    ? `data:${authUser?.photo_type};base64,${authUser?.photo_path}`
                    : ""
                }
                alt="Profile"
                width={193}
                height={193}
                className="absolute z-0 h-[193px] w-[193px] object-cover"
              />
            )}
            <p
              className={`font-semibold ${textStyles} top-[115px] left-[38px] z-2`}
            >
              {havePicture ? "Change image" : "Upload a picture"}
            </p>
          </div>
        </div>
        <p className="text-xs">
          Image must be below 2MB. Use PNG or JPG format.
        </p>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ProfilePictureWrapper;
