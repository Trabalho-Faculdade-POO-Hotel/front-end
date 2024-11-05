'use client';

import { Roboto } from "next/font/google";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import AppIcon from "../../AppIcon";

const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

const AppLogo = () => {
  return (
    <Link className="flex h-full items-center gap-3" href={"/reservations"}>
      <AppIcon className="w-14 h-14 my-auto ml-2" />
      <p
        className={twMerge(
          "text-blue-500 font-extrabold text-xl select-none uppercase",
          roboto.className
        )}
      >
        Hotel
      </p>
      <p
        className={twMerge(
          "text-blue-500 font-extrabold text-xl select-none -ml-2 uppercase",
          roboto.className
        )}
      >
        Azul Marinho
      </p>
    </Link>
  );
};

export default AppLogo;
