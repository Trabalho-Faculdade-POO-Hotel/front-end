import { twMerge } from "tailwind-merge";
import "./styles.css";

interface WavesAnimatedBackgroundProps {
  className?: string;
}
const WavesAnimatedBackground = ({
  className,
}: WavesAnimatedBackgroundProps) => {
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[110%] h-full z-[-1] blur-md">
      <section
        className={twMerge("absolute top-0 left-0 w-full h-full", className)}
      >
        <div className="air air1"></div>
        <div className="air air2"></div>
        <div className="air air3"></div>
        <div className="air air4"></div>
      </section>
    </div>
  );
};

export default WavesAnimatedBackground;
