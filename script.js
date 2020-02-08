// Constants
const VIDEO_ID = "1rth2rF5v-s";
const TIMESTAMP = {
  q1: 31.7,
  q1_correct: 32.5,
  q1_incorrect: 42.3,
  q2: 70
};

// Global variables
var player;
var nextPauseTime;
var nextSceneID;
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
  // player.seekTo(28);
  // player.pauseVideo();
  // let player = event.target;
  // console.log(event.target);
  // event.target.mute();
  // event.target.playVideo();
  // event.target.unMute();
}

// Called when the player's state changes
// YT.PlayerState.PLAYING = 1
function onPlayerStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.PLAYING:
      scheduleNextScene();
      break;
    case YT.PlayerState.PAUSED:
      // showNextScene();
      break;
    default:
      break;
  }
}

// Set timer to pause palyer at nextPauseTime
function scheduleNextScene() {
  clearTimeout(pausePlayTimer);
  if (!nextPauseTime) {
    return;
  }
  let currentTime = player.getCurrentTime();
  let playbackRate = player.getPlaybackRate();
  let remainingTime = ((nextPauseTime - currentTime) * 1000) / playbackRate;

  pausePlayTimer = setTimeout(function() {
    pauseVideo();
    showNextScene();
    nextPauseTime = null;
    nextSceneID = null;
  }, remainingTime);
}

function showNextScene() {
  if (!nextSceneID) {
    return;
  }
  $(nextSceneID).fadeIn();
}

function pauseVideo() {
  player.pauseVideo();
}

// On document ready
$(function() {
  $("#q1-section").hide();

  // Welcome screen start
  $("#welcome-scene button").click(function() {
    $(this)
      .parent()
      .fadeOut(function() {
        nextPauseTime = TIMESTAMP.q1;
        nextSceneID = "#q1-section";
        player.playVideo();
      });
  });

  // Question 1: Learner selected UVA
  $("#q1-uva").click(function() {
    $(this)
      .parent()
      .fadeOut(function() {
        player.seekTo(TIMESTAMP.q1_correct);
        player.playVideo();
        nextPauseTime = TIMESTAMP.q1_incorrect;
        // nextSceneID = "#q1-section";
      });
  });

  // Question 2: Learner selected UVB
  $("#q1-uvb").click(function() {
    $(this)
      .parent()
      .fadeOut(function() {
        player.seekTo(TIMESTAMP.q1_incorrect);
        player.playVideo();
        nextPauseTime = TIMESTAMP.q2;
        // nextSceneID = "#q1-section";
      });
  });
});
