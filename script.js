// Constants
const TICK_INTERVAL = 500;
const VIDEO_ID = "1rth2rF5v-s";

// Load IFrame Player API code asynchronously
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create an <iframe> (and YouTube player) after the API code downloads
var player;
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
  // console.log(event.target);
  // event.target.mute();
  // event.target.playVideo();
  // event.target.unMute();
  setInterval(timerCallback, TICK_INTERVAL);
}

// Called when the player's state changes
// YT.PlayerState.PLAYING = 1
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}

function seekTo(time) {
  player.seekTo(time);
}

function timerCallback() {
  time = player.getCurrentTime();
  rate = player.getPlaybackRate();
  console.log(time, rate);
}
