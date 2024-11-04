import { Roboto } from "next/font/google";
import { twMerge } from "tailwind-merge";
const backgroundVideo = require("@/assets/background_video.mp4");

const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

const AnimatedBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1]">
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover"
        muted
        src={backgroundVideo}
        autoPlay
        loop
      />
      <p
        className={twMerge(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-opacity-40 uppercase text-lg font-bold backdrop-blur-sm p-5 rounded-tl-2xl rounded-br-2xl",
          roboto.className
        )}
      >
        Hotel Azul Marinho
      </p>
    </div>
  );
};

export default AnimatedBackground;
