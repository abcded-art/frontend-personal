import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const LiveVideo = ({ src, poster }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      poster={poster}
      className="liveVideo"
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default LiveVideo;