import { twMerge } from "tailwind-merge";

interface DividerProps {
  className?: string;
  direction?: "horizontal" | "vertical";
}
const Divider = ({ className, direction = "horizontal" }: DividerProps) => {
  return (
    <div
      data-direction={direction}
      className={twMerge(
        "data-[direction=horizontal]:h-[3px] data-[direction=vertical]:w-[3px] grow rounded-full bg-black bg-opacity-10",
        className
      )}
    ></div>
  );
};

export default Divider;
