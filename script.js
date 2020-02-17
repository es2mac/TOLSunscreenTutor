// Constants
const VIDEO_ID = "LlHyP-mKyrg";
const TIMESTAMP = {
  q1: 59.0,
  q1_correct: 61.0,
  q1_incorrect: 66.0,
  q2: 170
};

// Global variables
var player;
var nextActionTime;
var nextAction;
var actionTimer;

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
      scheduleNextAction();
      break;
    case YT.PlayerState.PAUSED:
      break;
    default:
      break;
  }
}

// Set timer to perform action at nextActionTime
function scheduleNextAction() {
  clearTimeout(actionTimer);
  if (!nextActionTime) {
    return;
  }
  let currentTime = player.getCurrentTime();
  let playbackRate = player.getPlaybackRate();
  let remainingTime = ((nextActionTime - currentTime) * 1000) / playbackRate;

  actionTimer = setTimeout(function() {
    let action = nextAction;
    nextActionTime = null;
    nextAction = null;
    actionTimer = null;
    action();
  }, remainingTime);
}

// On document ready
$(function() {
  // Welcome screen start
  $("#welcome-scene button").click(function() {
    $(this)
      .parent()
      .fadeOut(function() {
        nextActionTime = TIMESTAMP.q1;
        nextAction = function() {
          player.pauseVideo();
          $("#q1-section").fadeIn();
        };
        // Start playing
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
        nextActionTime = TIMESTAMP.q1_incorrect;
        nextAction = function() {
          player.seekTo(TIMESTAMP.q2);
        };
      });
  });

  // Question 1: Learner selected UVB
  $("#q1-uvb").click(function() {
    $(this)
      .parent()
      .fadeOut(function() {
        player.seekTo(TIMESTAMP.q1_incorrect);
        player.playVideo();
        nextActionTime = TIMESTAMP.q2;
        nextAction = function() {
          player.seekTo(TIMESTAMP.q2);
        };
      });
  });

  // Question 1 after correct choice: choose to watch
  $("#q1-correct-watch").click(function() {
    $(this)
      .parent()
      .fadeOut(function() {
        player.seekTo(TIMESTAMP.q1_incorrect);
        player.playVideo();
        // nextActionTime = TIMESTAMP.q1_incorrect;
        nextAction = function() {
          player.seekTo(TIMESTAMP.q2);
        };
      });
  });
});
