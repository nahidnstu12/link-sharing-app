import { useEffect, useMemo, useRef, useState } from "react";

interface PlaformSelectBoxProps {
  initialState: string;
  zIndex?: number;
  linkId: string;
}

const platforms = [
  "Github",
  "Frontend Mentor",
  "Twitter",
  "LinkedIn",
  "YouTube",
  "Facebook",
  "Twitch",
  "Dev.to",
  "Codewars",
  "Codepen",
  "freeCodeCamp",
  "GitLab",
  "Hashnode",
  "Stack Overflow",
];

const PlaformSelectBox: React.FC<PlaformSelectBoxProps> = ({
  initialState,
  zIndex,
  linkId,
}) => {
  const formatPlatformName = (platform: string) =>
    platform.toLowerCase().replace(" ", "").replace(".", "");

  let initialPlatform = formatPlatformName(initialState);

  const [platform, setPlatform] = useState<string>(
    initialState ? initialState : "Github"
  );
  const [platformIcon, setPlatformIcon] = useState<string>(
    initialState
      ? `/images/icon-${initialPlatform}.svg`
      : "/images/icon-github.svg"
  );
  const [open, setOpen] = useState<boolean>(false);

  // Initialize ref with null
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleOption = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (!target.matches("#popup_option")) return;
    let dataOption = target.getAttribute("data-option");

    if (dataOption) {
      setPlatform(dataOption);
      const formattedOption = formatPlatformName(dataOption);
      setPlatformIcon(`/images/icon-${formattedOption}.svg`);
    }
  };

  const handlePopup = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const allPlatforms = useMemo(() => {
    return platforms.map((platform) => {
      const platformIcon = formatPlatformName(platform);

      return (
        <div
          className="flex items-center gap-3 cursor-pointer border-b border-gray-300 last:border-none py-3 hover:text-purple-600"
          data-option={platform}
          key={platform}
          id={"popup_option"}
        >
          <span
            className="w-4 h-4 bg-gray-400 hover:bg-purple-600"
            style={{
              WebkitMaskImage: `url('/images/icon-${platformIcon}.svg')`,
              maskImage: `url('/images/icon-${platformIcon}.svg')`,
              maskSize: `16px 16px`,
              maskRepeat: `no-repeat`,
              backgroundColor: `#737373`,
            }}
          ></span>
          {platform}
        </div>
      );
    });
  }, []);

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.style.display = open ? "block" : "none";
    }
  }, [open]);

  return (
    <fieldset
      className="flex flex-col gap-1 mb-3"
      name={"platform"}
      data-platform={platform}
    >
      <label className="text-gray-800 text-sm font-normal">Platform</label>

      <div
        className="flex items-center gap-3 px-4 py-2 w-full h-12 border border-gray-300 rounded-lg bg-white cursor-pointer relative hover:border-purple-600 hover:shadow-[0px_0px_32px_0px_rgba(99,60,255,0.25)]"
        onClick={handlePopup}
        style={{ zIndex }}
      >
        <img src={platformIcon} className="w-4 h-4" alt={`${platform} icon`} />
        {platform}
        <img
          src={
            open
              ? "/images/icon-chevron-up.svg"
              : "/images/icon-chevron-down.svg"
          }
          className="absolute top-0 bottom-0 m-auto right-4 w-4"
          alt="chevron icon"
        />
        <div
          className="absolute top-16 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-[0px_0px_32px_0px_rgba(0,0,0,0.10)] p-4 hidden"
          onClick={handleOption}
          ref={popupRef}
        >
          {allPlatforms}
        </div>
      </div>
    </fieldset>
  );
};

export default PlaformSelectBox;
