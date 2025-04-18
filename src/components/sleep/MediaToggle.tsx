
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaToggleProps {
  showVideo: boolean;
  onToggle: (enabled: boolean) => void;
}

const MediaToggle = ({ showVideo, onToggle }: MediaToggleProps) => {
  return (
    <Button
      variant="outline"
      className="w-full bg-white/50 hover:bg-white/60 text-mindful border-mindful/20"
      onClick={() => onToggle(!showVideo)}
    >
      <Video className="h-4 w-4 mr-2" />
      Switch to {showVideo ? 'Audio' : 'Video'}
    </Button>
  );
};

export default MediaToggle;
