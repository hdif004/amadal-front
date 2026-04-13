import React from "react";
import YouTube from "react-youtube";
import { asset } from "../config";

const VideoCard = ({ videoUrl, title, isPlaying, handlePlay }) => {
  return (
    <div className="h-[560px] lg:h-[580px] relative w-full">
      {isPlaying ? (
        <YouTube
          videoId={videoUrl}
          className="w-full h-full"
          opts={{
            width: "100%",
            height: "100%",
            playerVars: { autoplay: 1 },
          }}
        />
      ) : (
        <>
          <img className="w-full h-full object-cover" src={asset("VideoImage.webp")} alt="" />
          <div className="w-full absolute inset-0 flex justify-center h-full px-8 sm:px-16 md:px-40 items-center z-10">
            <div className="flex flex-col items-center gap-10">
              <div className="flex flex-col items-center gap-3">
                <h3 className="text-white text-base sm:text-sm font-extralight tracking-widest uppercase">Video</h3>
                <h1 className="text-white text-4xl sm:text-4xl text-center leading-tight sm:leading-[70px]">
                  {title}
                </h1>
              </div>
              <button onClick={handlePlay}>
                <div className="border border-white rounded-full flex items-center justify-center w-24 h-24 sm:w-20 sm:h-20 hover:bg-white/10 transition-colors">
                  <h3 className="text-white text-base tracking-widest">PLAY</h3>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoCard;
