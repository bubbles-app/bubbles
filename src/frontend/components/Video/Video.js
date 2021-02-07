import React, { Component } from 'react';
import YouTube from 'react-youtube';
import solaceConnection from '../../../backend/solace-connection';
import Paho from "paho-mqtt";

class VideoApp extends Component {
  constructor(props) {
    super(props);
    this.playNewVideo = this.playNewVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.videoId = "";
    this.state = {
      player: null,
      videoOptions: {
        height: '100%',
        width: '100%',
      }
    }
  }
  
  handleMessage(message) {
    const obj = JSON.parse(message.payloadString);
    console.log("Handle message here!");
    if(obj.message === 'Play press detected'){
      this.playVideo();
    }
    
    if(obj.message === 'Pause press detected'){
 	    this.pauseVideo();
    }
  }
  
  playNewVideo(videoId) {
    this.videoId = videoId;
    this.state.player.loadVideoById(this.videoId, 0);
  }

  playVideo() {
    console.log(this.state);
    this.state.player.playVideo();
  }

  pauseVideo() {
    this.state.player.pauseVideo();
  }

  onPlayerReady(event) {
    console.log("Player is ready: ", event);
    this.state.player =  event.target;
    solaceConnection.register(this.handleMessage.bind(this))
  }
 
  onVideoPlay(event) {
    console.log("Video played at: ", event.target.getCurrentTime());
    
    let message = new Paho.Message(JSON.stringify({message: 'Play press detected'}));//messageType: 'playPressed', message: 'Play press detected'}));
    message.destinationName = this.props.roomcode;
    solaceConnection.send(message);
  }

  onVideoPause(event) {
    console.log("Video paused at: ", event);
    let message = new Paho.Message(JSON.stringify({message: 'Pause press detected'}));//messageType: 'pausePressed', message: 'Pause press detected'}));
    message.destinationName = this.props.roomcode;
    solaceConnection.send(message);
  }

  onVideoPlaybackRateChange(event) {
    console.log("Video playback rate changed: ", event);
  }

  onVideoStateChange(event) {
    console.log("Video state changed: ", event);
    console.log("state: ", this.state);
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
