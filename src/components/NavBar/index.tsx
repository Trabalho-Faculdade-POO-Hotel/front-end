"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import AppLogo from "./AppLogo";
import NavMenu, { MenusData } from "./NavMenu";
import { twMerge } from "tailwind-merge";
import Divider from "../Divider";

interface NavBarProps {
  className?: string;
}
const NavBar = ({ className }: NavBarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const availableMenus: MenusData = useMemo(() => {
    return [
      {
        label: "dashboard",
        route: "/student/dashboard",
      },
      {
        label: "meus cursos",
        route: "/student/courses",
      },
      {
        label: "meus pagamentos",
        route: "/student/payments",
      },
      {
        label: "sobre nós",
        route: "/about",
      },
    ];
  }, []);

  const onMenuClick = useCallback(
    (menuData: MenusData[number]) => {
      router.push(menuData.route);
    },
    [router]
  );

  return (
    <div
      className={twMerge(
        "flex bg-white bg-opacity-90 backdrop-blur-md h-20 w-auto rounded-md shadow-sm border-b sticky top-0 px-16 z-50 m-1 box-border",
        className
      )}
    >
      <AppLogo />
      <NavMenu
        className="ml-auto"
        currentRoute={pathname}
        menusData={availableMenus}
        onMenuClick={onMenuClick}
      />
      <Divider className="grow-0 h-[70%] my-auto ml-3 mr-5" direction="vertical" />
    </div>
  );
};

export default NavBar;
