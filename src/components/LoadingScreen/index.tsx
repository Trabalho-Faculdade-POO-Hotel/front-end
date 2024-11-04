import { CircularProgress } from "@mui/material";
const backgroundVideo = require("@/assets/background_video.mp4");

const LoadingScreen = () => {
  return (
    <div className="fixed flex justify-center items-center bg-white bg-opacity-70 backdrop-blur-md !top-0 !left-0 !w-full !h-full pointer-events-auto z-[999999999999]">
      <video
        className="absolute top-0 left-0 w-full h-full blur-lg object-cover scale-125 brightness-50"
        src={backgroundVideo}
        autoPlay
        muted
        loop
      />
      <CircularProgress size={'50px'} />
    </div>
  );
};

export default LoadingScreen;
