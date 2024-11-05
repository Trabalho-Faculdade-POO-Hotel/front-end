import React, { MutableRefObject, RefObject } from "react";
import { FaChalkboardTeacher, FaUser, FaUserAstronaut, FaUserInjured } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

interface UserIconProps extends React.ComponentProps<"div"> {
  className?: string;
}
const UserIcon = React.forwardRef<HTMLDivElement, UserIconProps>(
  function UserIcon(
    { className, ...props }: UserIconProps,
    ref
  ) {
    return (
      <div
        ref={ref}
        className={twMerge(
          "w-12 h-12 bg-blue-500 rounded-full flex justify-center items-center mx-auto my-auto",
          className
        )}
        {...props}
      >
        <FaUser className="text-white w-[40%] h-[40%]" />
      </div>
    );
  }
);

export default UserIcon;
