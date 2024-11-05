import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

const removeUnusedBars = (path: string) =>
  path
    .split("/")
    .filter((subPath) => subPath !== "")
    .join("/");
const isMatchingCurrentRoute = (currentRoute: string, desiredRoute: string) => {
  const formatedDesiredRoute = removeUnusedBars(desiredRoute);
  const formatedCurrentRoute = removeUnusedBars(currentRoute);
  const desiredRouteLength = formatedDesiredRoute.length;

  return (
    formatedCurrentRoute.slice(0, desiredRouteLength) === formatedDesiredRoute
  );
};

export type MenusData = Array<{
  label: string;
  route: string;
}>;

interface NavMenuProps {
  className?: string;
  currentRoute: string;
  menusData: MenusData;
  onMenuClick?: (menuData: MenusData[number]) => void;
}
const NavMenu = ({
  className,
  currentRoute,
  menusData,
  onMenuClick,
}: NavMenuProps) => {
  const menusElements = useMemo(
    () =>
      menusData.map((menuData, i) => (
        <div
          className="group h-full capitalize flex justify-center items-center px-3 select-none cursor-pointer hover:scale-[120%] duration-200"
          key={i}
          onClick={() => onMenuClick && onMenuClick(menuData)}
        >
          <p
            data-iscurrentroute={isMatchingCurrentRoute(
              currentRoute,
              menuData.route
            )}
            className="relative after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-1 after:bg-transparent after:rounded-full group-hover:after:w-11/12 after:duration-100 data-[iscurrentroute=true]:after:w-11/12 data-[iscurrentroute=true]:after:bg-primary"
          >
            {menuData.label}
          </p>
        </div>
      )),
    [currentRoute, menusData, onMenuClick]
  );

  return (
    <div
      className={twMerge("flex justify-start items-center h-full", className)}
    >
      {menusElements}
    </div>
  );
};

export default NavMenu;
