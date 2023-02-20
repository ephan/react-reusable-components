import React from 'react';
import VideoPlayer from './VideoPlayer';
import { VideoProps } from './types';

const VideoPlayerExample: React.FC = () => {
  const videoProps: VideoProps = {
    src: 'https://download.samplelib.com/mp4/sample-5s.mp4',
    title: 'My Video',
  };

  return (
    <div className="container mx-auto p-4">
      <VideoPlayer {...videoProps} />
    </div>
  );
};

export default VideoPlayerExample;
