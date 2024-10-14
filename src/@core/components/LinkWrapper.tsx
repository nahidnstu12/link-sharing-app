"use client";

import Image from "next/image";
import React from "react";

import { usePathname } from "next/navigation";
import { LinkWrapperProps } from "../types";

import Iconfrontendmentor from "@/@core/assets/icon-frontend.tsx";
import Icongithub from "@/@core/assets/icon-github.tsx";

import { toast } from "react-toastify";
// import Icontwitter from "../assets/icon-twitter.svg";
// import Iconlinkedin from "../assets/icon-linkedin.svg";
// import Iconyoutube from "../assets/icon-youtube.svg";
// import Icontwitch from "../assets/icon-twitch.svg";
// import Icondevto from "../assets/icon-devto.svg";
// import Iconcodewars from "../assets/icon-codewars.svg";
// import Iconcodepen from "../assets/icon-codepen.svg";
// import Iconfreecodecamp from "../assets/icon-freecodecamp.svg";
// import Icongitlab from "../assets/icon-gitlab.svg";
// import Iconhashnode from "../assets/icon-hashnode.svg";
// import Iconfacebook from "../assets/icon-facebook.svg";
// import IconUploadImage from "../assets/icon-upload-image.svg";

/**
 * LinkWrapper renders a sortable link item with an icon, label, and interactive behavior.
 */

const formatText = (name: string): string => {
  return name.replace(/\s+/g, "").toLowerCase();
};

type IconComponents = {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export const icones: IconComponents = {
  Icongithub,
  Iconfrontendmentor,
  // Icontwitter,
  // Iconlinkedin,
  // Iconyoutube,
  // Icontwitch,
  // Icondevto,
  // Iconcodewars,
  // Iconcodepen,
  // Iconfreecodecamp,
  // Icongitlab,
  // Iconhashnode,
  // Iconfacebook,
  // IconUploadImage,
};

const colorMap = {
  "dark-purple": "bg-dark-purple",
  "link-black": "bg-link-black",
  "link-blue": "bg-link-blue",
  // Add other colors as needed
};

const LinkWrapper: React.FC<LinkWrapperProps> = ({
  id,
  label,
  color,
  url,
}: LinkWrapperProps): JSX.Element => {
  const pathname = usePathname();
  const isPreviewPage = pathname === "/preview";

  // const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const isFrontend = label === "Frontend Mentor";
  const iconKey = `Icon${formatText(label)}` as keyof typeof icones;
  const IconComponent = icones[iconKey];

  const handleClick = () => {
    if (url) {
      const validUrl =
        url.startsWith("http://") || url.startsWith("https://")
          ? url
          : `https://${url}`;
      navigator.clipboard
        .writeText(validUrl)
        .then(() => {
          console.log("URL copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy URL: ", err);
        });

      if (isPreviewPage) {
        toast.info("copie");
      } else {
        window.open(validUrl, "_blank");
      }
    } else {
      console.log("No URL provided");
    }
  };

  const backgroundColorClass = `bg-${color}`;

  return (
    <div
      // ref={setNodeRef}
      // {...attributes}
      // {...listeners}
      style={{
        // transform: CSS.Transform.toString(transform),
        transition: "background-color 0.2s ease",
        userSelect: "none" as const,
      }}
      // TODO: FIX Index ts
      className={`flex justify-between items-center sortable-item ${colorMap[color]} ${
        isFrontend ? "border" : ""
      } rounded-lg px-4 cursor-pointer w-full ${
        !isPreviewPage ? "h-11" : "h-14"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        {IconComponent && <IconComponent style={{ color: "#FFFFFF" }} />}
        <p className={`${isFrontend ? "text-black" : "text-white"}`}>{label}</p>
      </div>
      <Image
        src={`${
          isFrontend
            ? "/images/icon-arrow-right-dark.svg"
            : "/images/icon-arrow-right.svg"
        }`}
        alt={`follow the link`}
        width={16}
        height={16}
        className="w-[16px] h-[16px]"
        priority
      />
    </div>
  );
};

export default LinkWrapper;
