import React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}
const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={twMerge(
        "bg-white p-5 rounded-md shadow-md duration-100",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
