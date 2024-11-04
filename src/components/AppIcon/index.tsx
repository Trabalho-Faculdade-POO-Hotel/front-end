import Image from "next/image";
import LogoHighImage from "@/assets/logo_high.png";
import LogoLowImage from "@/assets/logo_low.png";
import { twMerge } from "tailwind-merge";

interface AppIconProps {
  className?: string;
  res?: "low" | "high";
}
const AppIcon = ({ className, res = "low" }: AppIconProps) => {
  return (
    <div
      className={twMerge(
        "relative flex justify-center items-center h-32 w-32",
        className
      )}
    >
      <Image
        className="w-full h-full text-center object-cover"
        src={res === "low" ? LogoLowImage : LogoHighImage}
        alt="Global Speaking Logo"
      />
    </div>
  );
};

export default AppIcon;
