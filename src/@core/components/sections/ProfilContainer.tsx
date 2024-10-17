"use client";

import ProfileDetailsWrapper from "../wrapper/ProfileDetailsWrapper";
import ProfilePictureWrapper from "../wrapper/ProfilePictureWrapper";

/**
 * ProfilContainer component renders the profile details form and handles form submission.
 */

const ProfilContainer = () => {
  const profile = {};

  return (
    <div className="flex flex-col space-between w-full h-full p-7 sm:p-10">
      <h1 className="text-titleSmall sm:text-title text-black mb-4">
        Profile Details
      </h1>
      <p className="mb-10">
        Add your details to create a personal touch to your profile.
      </p>

      <div className="mb-6">
        <ProfilePictureWrapper />
      </div>
      <div className="mb-3 sm:mb-[100px]">
        <ProfileDetailsWrapper />
      </div>
    </div>
  );
};

export default ProfilContainer;
