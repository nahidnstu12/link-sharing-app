"use client";

import React from "react";
import LogoutIcon from "@/@core/assets/icon-logout.tsx";

/**
 * LogoutWrapper renders a logout button with dynamic styling and an icon.
 */

const LogoutWrapper: React.FC<{ onClick: () => void }> = ({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={
        "flex items-center justify-center border border-dark-purple text-dark-purple hover:bg-lightest-purple rounded-lg w-[52px] h-11 sm:w-12 sm:h-12 cursor-pointer"
      }
    >
      <LogoutIcon className={"w-5 h-5"} />
    </button>
  );
};

export default LogoutWrapper;
