// Constants
const TICK_INTERVAL = 500;
const VIDEO_ID = "1rth2rF5v-s";

// Global variables
var player;
var pauseTime = 4000;
var pausePlayTimer;

// Load IFrame Player API code asynchronously
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create an <iframe> (and YouTube player) after the API code downloads
function onYouTubeIframeAPIReady() {
  player = new YT.Player("ytplayer", {
    height: "405",
    width: "720",
    videoId: VIDEO_ID,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// Called when the video player is ready
function onPlayerReady(event) {
  // let player = event.target;
  // console.log(event.target);
  // event.target.mute();
  // event.target.playVideo();
  // event.target.unMute();
}

// Called when the player's state changes
// YT.PlayerState.PLAYING = 1
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    scheduleNextPause();
  }
}

// Set timer to pause palyer at pauseTime
function scheduleNextPause() {
  clearTimeout(pausePlayTimer);
  if (!pauseTime) {
    return;
  }
  let currentTime = player.getCurrentTime() * 1000;
  let playbackRate = player.getPlaybackRate();
  let remainingTime = (pauseTime - currentTime) / playbackRate;

  pausePlayTimer = setTimeout(pauseVideo, remainingTime);
}

function pauseVideo() {
  player.pauseVideo();
}

function seekTo(time) {
  player.seekTo(time);
}
