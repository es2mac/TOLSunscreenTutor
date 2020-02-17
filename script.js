// Constants
const VIDEO_ID = "LlHyP-mKyrg";
const TIMESTAMP = {
  q1: 59.0,
  q1_correct: 61.0,
  q1_correct_choice: 66.0,
  q1_incorrect: 68.5,
  part1_conclusion: 126.5,
  q2: 150.0,
  q2_feedback: 153.0
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
function onPlayerReady(event) {}

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
    // Start playing
    player.playVideo();
    $(this)
      .parent()
      .fadeOut(function() {
        nextActionTime = TIMESTAMP.q1;
        nextAction = function() {
          player.pauseVideo();
          $("#q1-section").fadeIn();
        };
      });
  });

  // Question 1: Learner selected UVA (correct answer)
  $("#q1-uva").click(function() {
    player.seekTo(TIMESTAMP.q1_correct);
    player.playVideo();
    $(this)
      .parent()
      .fadeOut(function() {
        nextActionTime = TIMESTAMP.q1_correct_choice;
        nextAction = function() {
          player.pauseVideo();
          $("#q1-correct-feedback-section").fadeIn();
        };
      });
  });

  // Question 1: Learner selected UVB (incorrect answer)
  $("#q1-uvb").click(function() {
    let thisScene = $(this).parent();
    $("#q1-incorrect-feedback-section").fadeIn(function() {
      thisScene.hide();
    });
  });

  // A couple buttons will set the next action to showing Q2, so use this
  function setShowQ2Action() {
    nextActionTime = TIMESTAMP.q2;
    nextAction = function() {
      player.pauseVideo();
      $("#q2-section").fadeIn();
    };
  }

  // Question 1 after incorrect choice, OR
  // after correct choice but choose to watch
  $("#q1-incorrect-continue, #q1-correct-watch").click(function() {
    player.seekTo(TIMESTAMP.q1_incorrect);
    player.playVideo();
    $(this)
      .parent()
      .fadeOut(setShowQ2Action);
  });

  // Question 1 after correct choice: choose to skip
  $("#q1-correct-skip").click(function() {
    player.seekTo(TIMESTAMP.part1_conclusion);
    player.playVideo();
    $(this)
      .parent()
      .fadeOut(setShowQ2Action);
  });

  // Question 2 choose "Smooth"
  $("#q2-smooth").click(function() {
    let thisScene = $(this).parent();
    $("#q2-smooth-section").fadeIn(function() {
      thisScene.hide();
    });
  });

  // Question 2 choose "Reflection"
  $("#q2-reflection").click(function() {
    let thisScene = $(this).parent();
    $("#q2-reflection-section").fadeIn(function() {
      thisScene.hide();
    });
  });

  // Question 2 choose "Absorb"
  $("#q2-absorb").click(function() {
    let thisScene = $(this).parent();
    $("#q2-absorb-section").fadeIn(function() {
      thisScene.hide();
    });
  });

  // Question 2 choose "Hydrating"
  $("#q2-hydrating").click(function() {
    let thisScene = $(this).parent();
    $("#q2-hydrating-section").fadeIn(function() {
      thisScene.hide();
    });
  });

  // Question 2 continue after feedback (all 4 buttons)
  $(".q2-continue-button").click(function() {
    player.seekTo(TIMESTAMP.q2_feedback);
    player.playVideo();
    $(this)
      .parent()
      .fadeOut();
  });
});
