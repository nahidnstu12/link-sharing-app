"use client";

import useAuth from "@/@core/hook/useAuthContext";
import { usePathname } from "next/navigation";
import PreviewBtn from "../common/PreviewBtn";
import LogoutWrapper from "../wrapper/LogoutWrapper";
import LogoWrapper from "../wrapper/LogoWrapper";
import NavWrapper from "../wrapper/NavWrapper";

/**
 * Banner component renders the navigation bar and logout button at the top of the application.
 */
const navItems = [
  { type: "link", path: "/home" },
  { type: "profile", path: "/profile" },
];
const Banner = (): JSX.Element => {
  const pathname = usePathname();
  const { handleLogout } = useAuth();

  return (
    <header className="mx-auto my-5 bg-white sm:w-[95%] sm:rounded-lg">
      <nav className="flex justify-between items-center px-4 lg:px-6 py-4 h-[78px]">
        <LogoWrapper />
        <div className="flex gap-2 lg:gap-4 ">
          {navItems.map((item) => (
            <NavWrapper
              key={item.path}
              type={item.type}
              isSelected={pathname === item.path}
              link={item.path}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <div className=" w-[52px] h-[42px] sm:w-[100px] sm:h-[46px]">
            <PreviewBtn href={"/preview"} label={"Preview"} />
          </div>
          <LogoutWrapper onClick={handleLogout} />
        </div>
      </nav>
    </header>
  );
};

export default Banner;
