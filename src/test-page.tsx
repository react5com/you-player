import { FC, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { YouPlayer } from './YouPlayer';
import type { IYouTubePlayer, PlayerState } from './interfaces';

const TestPage: FC = () => {
  const [player, setPlayer] = useState<IYouTubePlayer | null>(null);
  const handleReady = (p: IYouTubePlayer) => {
    console.log('Player ready', p);
    setPlayer(p);
    p?.playVideo();
  };
  const handleStateChange = (state: PlayerState, player: IYouTubePlayer) => {
    console.log('State change', state);
  };
  return (
    <div>
      <h1>Test Page</h1>
      <YouPlayer videoId='aKydtOXW8mI' onReady={handleReady} onStateChange={handleStateChange}/>
      <div>
        <button onClick={() => player?.pauseVideo()}>Pause</button>
        <button onClick={() => player?.playVideo}>Play</button>
        <button onClick={() => player?.nextVideo()}>Next</button>
        <button onClick={() => player?.previousVideo()}>Previous</button>
      </div>
    </div>
  );
};

const app = document.getElementById('app');
if (!app) {
  throw new Error('No app element');
}
const root = createRoot(app);
root.render(<TestPage/>);
