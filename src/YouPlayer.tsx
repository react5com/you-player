import { useEffect, useRef } from "react";
import type { IPlayerEventInfo, IYouTubePlayer } from "./interfaces";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: any;
    YT: any;
  }
}

const youTubeAPIEventDispatcher = new EventTarget();
function fireReadyEvent() {
  youTubeAPIEventDispatcher.dispatchEvent(new Event("ready"));
}
if(typeof window !== 'undefined') {
  const previousApiReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function () {
    if (previousApiReady) {
      previousApiReady();
    }
    fireReadyEvent();
  };
}

function loadYouTubeIframeAPI() {
  if (!document.querySelector("script[src='https://www.youtube.com/iframe_api']")) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
  else if (window.YT) {
    fireReadyEvent();
  }
}

interface YouTubeVideoPlayerProps {
  videoId: string;
  start?: number | null;
  end?: number | null;
  className?: string;
  onReady?: (player: IYouTubePlayer) => void;
  onStateChange?: (state: number, player: IYouTubePlayer) => void;
  onError?: (error: number, player: IYouTubePlayer) => void;
}
export const YouPlayer = ({videoId, start = 0, end, className, onReady, onStateChange, onError}: YouTubeVideoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<IYouTubePlayer>(null);

  useEffect(() => {
    youTubeAPIEventDispatcher.addEventListener('ready', handleApiReady);
    loadYouTubeIframeAPI();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      youTubeAPIEventDispatcher.removeEventListener('ready', handleApiReady);
    };
  }, [videoId, start, end]);

  const handleApiReady = () => {
    createPlayer();
  }
  const createPlayer = () => {
    if(window.YT && !playerRef.current) {
      playerRef.current = new window.YT.Player(iframeRef.current, {
        videoId,
        playerVars: {
          start,
          end,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError
        },
      });
    }
  }

  const onPlayerReady = () => {
    (onReady && playerRef.current) && onReady(playerRef.current);
  };

  const onPlayerStateChange = ({ data: newState }: IPlayerEventInfo) => {
    (onStateChange && playerRef.current) && onStateChange(newState, playerRef.current);
  };
  const onPlayerError = ({ data: errorCode }: IPlayerEventInfo) => {
    (onError && playerRef.current) && onError(errorCode, playerRef.current);
  }

  return (
    <div
      id={`youtube-player-${videoId}`}
      ref={iframeRef}
      className={className}
    />
  );
}
export default YouPlayer