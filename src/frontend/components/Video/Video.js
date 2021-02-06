import React, { Component } from 'react';
import YouTube from 'react-youtube';

class VideoApp extends Component {
  player = {}
  state = {
      video: {
          id: "0NDv0Qqq6F0",
          options: {
            height: '100%',
            width: '100%',
          }
      }
  }
 
  onPlayerReady(event){
    console.log("Player is ready: ", event);
  }
 
  onVideoPlay(event){
    console.log("Video played at: ", event);
  }

  onVideoPause(event){
    console.log("Video paused at: ", event);
  }

  onVideoPlaybackRateChange(event){
    console.log("Video playback rate changed: ", event);
  }

  onVideoStateChange(event){
    console.log("Video state changed: ", event);
  }

  onVideoEnd(){
    console.log("Video ended");
  }
  
  onVideoError(event){
    console.log("Video error: ", event)
  }

  render() {
    return (
      <YouTube
        videoId={this.state.video.id}
        className={"Video"}
        opts={this.state.video.options}
        onReady={this.onPlayerReady}
        onPlay={this.onVideoPlay}
        onPause={this.onVideoPause}
        onPlaybackRateChange={this.onVideoPlaybackRateChange}
        onStateChange={this.onVideoStateChange}
        onEnd={this.onVideoEnd}
      />
    );
  }
}

export default VideoApp;