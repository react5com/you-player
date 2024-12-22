# YouPlayer

YouPlayer is a lightweight React component for embedding and controlling YouTube videos. It wraps the [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference), making it straightforward to integrate into your React and Typescript application.

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Props](#props)
5. [Example](#example)
6. [API Reference](#api-reference)
7. [Contributing](#contributing)
8. [Support](#support)
9. [License](#license)

## Features
- Simple and intuitive React component for YouTube video playback
- Access to the underlying IYouTubePlayer for advanced controls (play, pause, next video, etc.)
- Callback handlers for player events: onReady, onStateChange, etc.

## Installation

### Using npm
```sh
npm install @react5/you-player
```

### Using yarn
```sh
yarn add @react5/you-player
```

## Usage

```jsx
import { FC, useState } from 'react'
import { YouPlayer, type IYouTubePlayer, type PlayerState } from '@react5/you-player'

const MyComponent: FC = () => {
  const [player, setPlayer] = useState<IYouTubePlayer | null>(null)

  const handleReady = (p: IYouTubePlayer) => {
    console.log('Player ready')
    setPlayer(p)
    p?.playVideo()
  }

  const handleStateChange = (state: PlayerState, player: IYouTubePlayer) => {
    console.log('State change', state)
  }

  return (
    <div>
      <h1>YouPlayer Demo</h1>
      <YouPlayer
        videoId="aKydtOXW8mI"
        onReady={handleReady}
        onStateChange={handleStateChange}
      />
      <div>
        <button onClick={() => player?.pauseVideo()}>Pause</button>
        <button onClick={() => player?.playVideo()}>Play</button>
        <button onClick={() => player?.nextVideo()}>Next</button>
        <button onClick={() => player?.previousVideo()}>Previous</button>
      </div>
    </div>
  )
}

export default MyComponent
```

## Props

| Prop           | Type                                      | Default   | Required | Description                                               |
|----------------|-------------------------------------------|-----------|----------|-----------------------------------------------------------|
| videoId        | string                                    | -         | yes      | The YouTube video ID to load.                             |
| onReady        | (player: IYouTubePlayer) => void          | undefined | no       | Called when the player is initialized and ready. Receives the IYouTubePlayer instance. |
| onStateChange  | (state: PlayerState, player: IYouTubePlayer) => void | undefined | no       | Called when the player’s state changes. Receives new state and the player instance. |
| height         | string \| number                          | 360       | no       | The player iframe height (can be px or %).                |
| width          | string \| number                          | 640       | no       | The player iframe width (can be px or %).                 |

## Example

Below is a minimal example that loads a YouTube video and starts playback when the player is ready:

```jsx
import React, { FC } from 'react'
import { YouPlayer } from '@react5/you-player'

const SimpleUsage: FC = () => {
  return (
    <YouPlayer
      videoId="aKydtOXW8mI"
      onReady={(player) => {
        console.log('Player is ready!')
        player.playVideo()
      }}
    />
  )
}

export default SimpleUsage
```

## API Reference

### IYouTubePlayer

IYouTubePlayer is the interface representing the underlying YouTube Player instance. It provides methods such as:
- `playVideo()`
- `pauseVideo()`
- `stopVideo()`
- `seekTo(seconds: number, allowSeekAhead: boolean)`
- `nextVideo()`
- `previousVideo()`
- `mute()`
- `unMute()`
- `isMuted()`
- `setVolume(volume: number)`
- `getVolume()`
- `getPlayerState()`

For full details, see the official [YouTube IFrame Player API Reference](https://developers.google.com/youtube/iframe_api_reference).

### PlayerState

PlayerState is an enum representing the player’s current state:
- `UNSTARTED` (typically -1)
- `ENDED` (0)
- `PLAYING` (1)
- `PAUSED` (2)
- `BUFFERING` (3)
- `CUED` (5)

## Contributing

Contributions are welcome!

## Support

If you have any questions or run into issues:
- Check the Issues to see if your problem has already been addressed.
- Create a new issue with details about the bug or feature request.
- You can also reach out to us via email if you prefer a private channel.

## License

YouPlayer is MIT licensed. Feel free to fork, submit pull requests, and use this component in your projects.
