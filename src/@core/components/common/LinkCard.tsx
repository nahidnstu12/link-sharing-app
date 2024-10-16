"use client";

import { usePathname } from "next/navigation";
import LinkWrapper from "../wrapper/LinkWrapper";

/**
 * LinkCard component renders a list of links with drag-and-drop functionality.
 * */

const LinkCard = ({ links }: any): JSX.Element => {
  const pathname = usePathname();
  const isPreviewPage = pathname === "/preview";



  return (
    <>
      {!isPreviewPage ? (
        <div className="flex flex-col gap-5 w-full sortable-list ">
          {links &&
            links.map((li: any) => (
              <LinkWrapper
                key={li._id}
                id={li._id}
                label={li.platform}
                color={li.color}
                url={li.link}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full sortable-list ">
          {links &&
            links.map((li: any) => (
              <LinkWrapper
                key={li._id}
                id={li._id}
                label={li.platform}
                color={li.color}
                url={li.link}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default LinkCard;
