import React, { useRef, useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";

type VideoProps = {
  src: string;
  title: string;
};

const VideoPlayer: React.FC<VideoProps> = ({ src, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (video) {
      if (!isFullScreen) {
        video.requestFullscreen();
        setIsFullScreen(true);
      } else {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const timeRange = video.buffered.length > 0 ? video.buffered.end(0) : 0;
      const currentTime = video.currentTime;
      const duration = video.duration;
      const percent = (currentTime / duration) * 100;
      setTime({ timeRange, currentTime, duration, percent });
    }
  };

  const [time, setTime] = useState({
    timeRange: 0,
    currentTime: 0,
    duration: 0,
    percent: 0,
  });

  const seek = (event: React.MouseEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      const times =
        (event.nativeEvent.offsetX / event.currentTarget.offsetWidth) *
        video.duration;
      video.currentTime = times;
      setTime({ ...time });
    }
  };

  const { currentTime, duration, percent } = time;
  const formattedCurrentTime = formatTime(currentTime);
  const formattedDuration = formatTime(duration);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        title={title}
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-50 text-white px-2 py-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isPlaying ? (
              <PauseIcon
                className="h-5 w-5 cursor-pointer"
                onClick={togglePlay}
              />
            ) : (
              <PlayIcon
                className="h-5 w-5 cursor-pointer"
                onClick={togglePlay}
              />
            )}
            <span className="ml-2 mr-4">{formattedCurrentTime}</span>
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleMute}
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="h-5 w-5" />
              ) : (
                <SpeakerWaveIcon className="h-5 w-5" />
              )}
            </div>

            <div className="ml-2 w-48">
              <div className="h-1 relative bg-gray-700">
                <div
                  className="h-1 absolute bg-white"
                  style={{ width: percent + "%" }}
                  onClick={seek}
                ></div>
              </div>
            </div>
            <span className="ml-2">{formattedDuration}</span>
          </div>
          <div className="flex items-center">
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleFullScreen}
            >
              <ArrowsPointingOutIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
