"use client";

import { CircularProgress, circularProgressClasses } from "@mui/material";
import { twMerge } from "tailwind-merge";

interface ProgressCircleProps {
  className?: string;
  size?: number | string;
  percentage: number;
}
const ProgressCircle = ({
  className,
  size,
  percentage = 0,
}: ProgressCircleProps) => {
  return (
    <div
      className={twMerge(
        "relative flex justify-center items-center w-fit",
        className
      )}
    >
      <CircularProgress
        className="absolute top-1/2 left-1/2 !-translate-x-1/2 !-translate-y-1/2 !text-gray-200"
        variant="determinate"
        value={100}
        size={size}
      />
      <CircularProgress
        variant="determinate"
        value={percentage}
        size={size}
        sx={{
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
      />
      <p className="flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {percentage?.toFixed?.(0)}%
      </p>
    </div>
  );
};

export default ProgressCircle;
