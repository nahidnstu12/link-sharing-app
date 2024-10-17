"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLinks } from "../../hook/useLinks";
import LinkCard from "../common/LinkCard";
import DisplayPreviewProfile from "./DisplayPreviewProfile";

/**
 * Renders the MobileContainer component, which displays the user's profile and links.
 */

const MobileContainer = (): JSX.Element => {
  const { links } = useLinks();
  

  const containerClass =
    links && links.length > 5
      ? "no-scrollbar h-[300px] overflow-y-auto "
      : "h-auto";

  const pathname = usePathname();
  const isProfilPage = pathname === "/profile";

  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="relative">
          <Image
            src={"/images/illustration-phone-mockup.svg"}
            alt=""
            width={308}
            height={632}
            className="z-1"
            priority
          />
          <div className={`absolute top-10 left-[55px] w-[200px] h-[200px] `}>
            <DisplayPreviewProfile  />
          </div>
          <div
            className={` ${containerClass} absolute left-8 top-[278px] w-60 h-1/2 ${
              isProfilPage ? "bg-white h-[305px] z-2" : ""
            } `}
          >
            <LinkCard links={links} />
          </div>
          {links && links.length > 5 && (
            <span className="absolute z-99 bottom-[3%] left-1/2 text-sm transform -translate-x-1/2">
              Scroll up and down
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileContainer;
