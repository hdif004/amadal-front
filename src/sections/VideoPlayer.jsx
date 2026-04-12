import React, { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import VideoCard from "../components/VideoCard";
import { useTranslation } from 'react-i18next';

const VideoPlayer = () => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingStates, setIsPlayingStates] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      const slideCount = emblaApi.slideNodes().length;
      setIsPlayingStates(Array(slideCount).fill(false));

      const onSelect = () => {
        setCurrentIndex(emblaApi.selectedScrollSnap());
      };

      emblaApi.on("select", onSelect);
      onSelect();

      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi]);

  useEffect(() => {
    setIsPlayingStates((prev) =>
      prev.map((isPlaying, index) => (index === currentIndex ? isPlaying : false))
    );
  }, [currentIndex]);

  const handlePlay = (index) => {
    setIsPlayingStates((prev) =>
      prev.map((isPlaying, i) => (i === index ? true : false))
    );
  };

  const videos = [
    { 
      id: "VuwS78Yk1Gg", 
      title: t('videoPlayer.videos.video1.title')
    },
    { 
      id: "uh08YKgFH1A", 
      title: t('videoPlayer.videos.video2.title')
    },
    { 
      id: "s06agKVFR08", 
      title: t('videoPlayer.videos.video3.title')
    },
  ];

  return (
    <div className="relative w-full h-[480px] lg:h-[580px] rounded-b-3xl">
      <div className="absolute inset-0 w-full flex items-center justify-between rounded-b-3xl z-[90]">
        <div onClick={scrollPrev} className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20">
          <button
            className="rounded-full bg-white/80 p-2 lg:p-3 hover:bg-white transition-colors"
            aria-label={t('videoPlayer.previous')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 lg:w-8 lg:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>
        <div ref={emblaRef} className="w-full rounded-b-3xl overflow-hidden h-full">
          <div className="flex w-full h-full">
            {videos.map((video, index) => (
              <div key={index} className="flex-shrink-0 w-full h-full">
                <VideoCard
                  videoUrl={video.id}
                  title={video.title}
                  isPlaying={isPlayingStates[index]}
                  handlePlay={() => handlePlay(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <div onClick={scrollNext} className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20">
          <button
            className="rounded-full bg-white/80 p-2 lg:p-3 hover:bg-white transition-colors"
            aria-label={t('videoPlayer.next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 lg:w-8 lg:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
