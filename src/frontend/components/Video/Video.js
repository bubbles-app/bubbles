import React, { Component } from 'react';
import YouTube from 'react-youtube';
import solaceConnection from '../../../backend/solace-connection';
import Paho from "paho-mqtt";

class VideoApp extends Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.playNewVideo = this.playNewVideo.bind(this);
    this.videoId = "";
    this.state = {
      videoOptions: {
        height: '100%',
        width: '100%',
      }
    }
    solaceConnection.register(this.handleMessage.bind(this))
  }
  
  handleMessage(message) {
    const obj = JSON.parse(message.payloadString);
    if(obj.messageType === 'playPressed'){
      console.log("Got message play pressed")
      this.playVideo();
    }
    
    if(obj.messageType === 'pausePressed'){
      console.log("Got message pause pressed")
      this.pauseVideo();
    }
  
  }
  
  playNewVideo(videoId) {
    this.videoId = videoId;
    this.player.loadVideoById(this.videoId, 0);
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  onPlayerReady(event) {
    console.log("Player is ready: ", event);
    this.player = event.target;
  }
 
  onVideoPlay(event) {
    console.log("Video played at: ", event.target.getCurrentTime());
    
    let message = new Paho.Message(JSON.stringify({ messageType: 'playPressed', message: 'Play press detected'}))
    message.destinationName = this.props.roomcode
    solaceConnection.send(message)
  }

  onVideoPause(event) {
    console.log("Video paused at: ", event);
    let message = new Paho.Message(JSON.stringify({ messageType: 'pausePressed', message: 'Pause press detected'}))
    message.destinationName = this.props.roomcode
    solaceConnection.send(message)
  }

  onVideoPlaybackRateChange(event) {
    console.log("Video playback rate changed: ", event);
  }

  onVideoStateChange(event) {
    console.log("Video state changed: ", event);
  }

  onVideoEnd() {
    console.log("Video ended");
  }
  
  onVideoError(event) {
    console.log("Video error: ", event);
  }

  render() {
    return (
      <YouTube
        videoId={this.videoId}
        className={"Video"}
        opts={this.state.videoOptions}
        onReady={this.onPlayerReady.bind(this)}
        onPlay={this.onVideoPlay.bind(this)}
        onPause={this.onVideoPause.bind(this)}
        onPlaybackRateChange={this.onVideoPlaybackRateChange.bind(this)}
        onStateChange={this.onVideoStateChange.bind(this)}
        onEnd={this.onVideoEnd.bind(this)}
      />
    );
  }
}

export default VideoApp;
