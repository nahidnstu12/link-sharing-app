"use client";

import { usePathname } from "next/navigation";
import LinkWrapper from "./LinkWrapper";

/**
 * LinkCard component renders a list of links with drag-and-drop functionality.
 * */

const LinkCard = (): JSX.Element => {
  const pathname = usePathname();
  const isPreviewPage = pathname === "/preview";

  // const { link, sensors, handleDragEnd } = useDragAndDrop();
  let link: any = [
    {
      key: "01",
      label: "GitHub",
      url: "github.com/nahid",
      color: "link-black",
      isLocal: false,
    },
    {
      key: "03",
      label: "LinkedIn",
      url: "linkedin.com/nahid-dev",
      color: "link-blue",
      isLocal: false,
    }
  ];

  return (
    <>
      {!isPreviewPage ? (
        <div className="flex flex-col gap-5 w-full sortable-list ">
          {link &&
            link.map((li: any) => (
              <LinkWrapper
                key={li.key}
                id={li.key}
                label={li.label}
                color={li.color}
                url={li.url}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full sortable-list ">
          {link &&
            link.map((li: any) => (
              <LinkWrapper
                key={li.key}
                id={li.key}
                label={li.label}
                color={li.color}
                url={li.url}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default LinkCard;
