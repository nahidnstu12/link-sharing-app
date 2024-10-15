import { useEffect, useMemo, useRef, useState } from "react";
import { platforms } from "../../helpers/utils";

interface PlatformSelectBoxProps {
  platformValue: string;
  setValue: (name: string, value: any) => void;
}

const PlatformSelectBox: React.FC<PlatformSelectBoxProps> = ({
  platformValue,
  setValue,
}) => {
  console.log("platformValue", platformValue);

  const formatPlatformName = (platform: string) =>
    platform.toLowerCase().replace(" ", "").replace(".", "");

  let initialPlatform = platformValue && formatPlatformName(platformValue);

  const [platform, setPlatform] = useState<string>(platformValue || "Github");
  const [platformIcon, setPlatformIcon] = useState<string>(
    platformValue
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
      setValue("platform", dataOption);
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
    if (platformValue) {
      setPlatform(platformValue);
      const formattedOption = formatPlatformName(platformValue);
      setPlatformIcon(`/images/icon-${formattedOption}.svg`);
    }
  }, [platformValue]);

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
          className="absolute top-16 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-[0px_0px_32px_0px_rgba(0,0,0,0.10)] p-4 hidden z-10"
          onClick={handleOption}
          ref={popupRef}
        >
          {allPlatforms}
        </div>
      </div>
    </fieldset>
  );
};

export default PlatformSelectBox;
