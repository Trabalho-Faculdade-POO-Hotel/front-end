import { CSSProperties } from "react";
import { FaStar } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface StarProgressProps {
  progress: number;
  size: number;
  className?: string;
}
const StarProgress = ({
  className = "",
  progress,
  size,
}: StarProgressProps) => {
  return (
    <div className={twMerge("relative -scale-100 grow-0 shrink-0", className)}>
      <FaStar className="text-gray-300 -scale-100" size={`${size}px`} />
      <div
        className="absolute top-0 left-0 w-full h-[var(--progress)] overflow-hidden duration-100"
        style={
          {
            "--progress": `${Math.max(0, Math.min(progress, 100))}%`,
          } as CSSProperties
        }
      >
        <FaStar className="text-yellow-500 -scale-100" size={`${size}px`} />
      </div>
    </div>
  );
};

export default StarProgress;
