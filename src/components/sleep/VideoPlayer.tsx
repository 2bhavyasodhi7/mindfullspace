
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url?: string | null;
  title: string;
}

const VideoPlayer = ({ url, title }: VideoPlayerProps) => {
  if (!url) {
    return (
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/90 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="mb-2">⚠️</div>
          <div className="text-lg">Video unavailable</div>
          <div className="text-sm text-gray-400">This video is unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/5">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
        playing={false}
        light={true}
        title={title}
      />
    </div>
  );
};

export default VideoPlayer;
