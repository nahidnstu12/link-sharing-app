"use client";

import React from "react";

// import IconLinkSmall from "../../../assets/logo-devlinks-small.svg";
import IconLinkSmall from "@/@core/assets/logo-devlinks-small.tsx";

/**
 * LogoutWrapper renders a logout button with dynamic styling and an icon.
 */

const LogoWrapper: React.FC = (): JSX.Element => {
  //   const isMobile = useMediaQuery({ query: "(min-width: 640px)" });

  //   return isMobile! ? (
  //     <div className="w-[120px] h-10 lg:w-[183px] lg:h-10">
  //       <IconLinkLarge className="w-full h-full max-w-full max-h-full" />
  //     </div>
  //   ) : (
  //     <IconLinkSmall />
  //   );
  return <IconLinkSmall />;
};

export default LogoWrapper;
