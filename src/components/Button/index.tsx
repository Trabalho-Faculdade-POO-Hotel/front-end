import { CircularProgress } from "@mui/material";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | React.ReactNode[];
  loading?: boolean;
  type?: "button" | "submit";
}
const Button = ({
  children,
  type = "button",
  loading = false,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={loading}
      type={type}
      data-isloading={loading}
      className={twMerge(
        "data-[isloading=true]:opacity-80 data-[isloading=true]:cursor-default data-[isloading=true]:hover:bg-blue-500 flex justify-center items-center bg-blue-500 text-white rounded-md shadow-lg p-3 hover:bg-blue-600 duration-100 cursor-pointer active:scale-105",
        className
      )}
      {...props}
    >
      {!loading ? (
        children
      ) : (
        <>
          {" "}
          <CircularProgress className="!text-white" />
        </>
      )}
    </button>
  );
};

export default Button;
