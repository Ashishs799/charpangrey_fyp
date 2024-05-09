import React from "react";
import { useEffect, useRef } from "react";

export const Slider = ({ carVid }) => {
  const videoRef = useRef();

  useEffect(() => {
    // When carVid.url changes, update the video source
    videoRef.current.src = carVid.url;
    // Load the new source
    videoRef.current.load();
  }, [carVid.url]);

  return (
    <div className="video-slider">
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        autoPlay
        muted
        loop
        controls={false}
        id="video"
      >
        <source src={carVid.url} type="video/mp4" />
      </video>
    </div>
  );
};
