"use client";

import Button from "./Button";
import ProfileDetailsWrapper from "./ProfileDetailsWrapper";
import ProfilePictureWrapper from "./ProfilePictureWrapper";

/**
 * ProfilContainer component renders the profile details form and handles form submission.
 */

const ProfilContainer = () => {
  // const { profile, profilErrors, setFile, handleChange, handleSubmit } =
  //   useUpdateProfile();
  const profile = {};

  return (
    <div className="flex flex-col space-between w-full h-full p-7 sm:p-10">
      <h1 className="text-titleSmall sm:text-title text-black mb-4">
        Profile Details
      </h1>
      <p className="mb-10">
        Add your details to create a personal touch to your profile.
      </p>
      <form onSubmit={() => {}}>
        <div className="mb-6">
          <ProfilePictureWrapper setFile={() => {}} />
        </div>
        <div className="mb-6 sm:mb-[100px]">
          <ProfileDetailsWrapper
            profile={profile}
            handleChange={() => {}}
            profilErrors={{}}
          />
        </div>
        <div className="flex justify-end w-full border-t ">
          <div className="w-full sm:w-[91px] mt-6">
            <Button label={"Save"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilContainer;
