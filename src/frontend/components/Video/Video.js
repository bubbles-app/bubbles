import React, { Component } from 'react';
import YouTube from 'react-youtube';
import solaceConnection from '../../../backend/solace-connection';
import Paho from 'paho-mqtt';

class VideoApp extends Component {
  constructor(props) {
    super(props);
    this.playNewVideo = this.playNewVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.getStateName = this.getStateName.bind(this);
    this.videoId = '';
    this.state = {
      player: null,
      videoOptions: {
        height: '100%',
        width: '100%'
      }
    };
  }

  handleMessage(message) {
    const obj = JSON.parse(message.payloadString);
    if (obj.messageType === 'playPressed') {
      this.playVideo();
    }

    if (obj.messageType === 'pausePressed') {
      this.pauseVideo();
    }

    if (obj.messageType === 'videoStateChange') {
      const eventCode = obj.eventCode;
      const stateName = this.getStateName(eventCode);
      const broadcastedVideoTime = obj.videoTime;
      const currentVideoTime = this.state.player.getCurrentTime();

      // only seek if difference in video time is greater than 1 sec
      if (Math.abs(currentVideoTime - broadcastedVideoTime) > 1) {
        this.state.player.seekTo(broadcastedVideoTime);
        if (stateName === 'playing') {
          this.playVideo();
        } else if (stateName === 'paused') {
          this.pauseVideo();
        }
      }
    }
  }

  playNewVideo(videoId) {
    this.videoId = videoId;
    if (this.state.player) {
      this.state.player.loadVideoById(this.videoId, 0);
    }
  }

  playVideo(event) {
    this.state.player.playVideo();
  }

  pauseVideo(event) {
    this.state.player.pauseVideo();
  }

  onPlayerReady(event) {
    this.state.player = event.target;
    // videoId will be some video if the user joined a room with an already-playing video
    if (this.videoId !== '') {
      this.playNewVideo(this.videoId);
    }
    solaceConnection.register(this.handleMessage.bind(this));
  }

  onVideoPlay(event) {
    let message = new Paho.Message(JSON.stringify({ messageType: 'playPressed', message: 'Play press detected' }));
    message.destinationName = this.props.roomcode;
    solaceConnection.send(message);
  }

  onVideoPause(event) {
    let message = new Paho.Message(JSON.stringify({ messageType: 'pausePressed', message: 'Pause press detected' }));
    message.destinationName = this.props.roomcode;
    solaceConnection.send(message);
  }

  onVideoPlaybackRateChange(event) {}

  onVideoStateChange(event) {
    const code = event.data;
    const videoTime = event.target.getCurrentTime();
    console.log(`Video state ${this.getStateName(code)} at: `, videoTime);

    // broadcase this video state change (this is how we handle seeks for now)
    let message = new Paho.Message(
      JSON.stringify({ messageType: 'videoStateChange', eventCode: code, videoTime: videoTime })
    );
    message.destinationName = this.props.roomcode;
    solaceConnection.send(message);
  }

  onVideoEnd(event) {
    console.log('Video ended');
  }

  onVideoError(event) {
    console.log('Video error: ', event);
  }

  getStateName(eventCode) {
    switch (eventCode) {
      case -1:
        return 'unstarted';
      case 0:
        return 'ended';
      case 1:
        return 'playing';
      case 2:
        return 'paused';
      case 3:
        return 'buffering';
      case 5:
        return 'video cued';
      default:
        return 'invalid code';
    }
  }

  render() {
    return (
      <YouTube
        videoId={this.videoId}
        className={'Video'}
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
