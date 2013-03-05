define(function () {

  window.app = window.app || {
    collections: {},
    models: {},
    views: {}
  };

  var pointer = {
    down: "mousedown",
    up: "mouseup",
    move: "mousemove"
  }
  if ("touchstart" in window) {
    // http://www.w3.org/TR/touch-events/
    pointer = {
      down: "touchstart",
      up: "touchend",
      move: "touchmove"
    }
  }
  else if (window.navigator.msPointerEnabled) {
    // http://msdn.microsoft.com/en-us/library/ie/hh673557(v=vs.85).aspx#pointer_events
    pointer = {
      down: "MSPointerDown",
      up: "MSPointerUp",
      move: "MSPointerMove"
    }
  }
  else if ("pointerdown" in window) {
    http://www.w3.org/TR/pointerevents/
    pointer = {
      down: "pointerdown",
      up: "pointerup",
      move: "pointermove"
    }
  }

  SEEDS_CONFIG = {
    api: {
      base: "http://openseeds.io", //"http://openseedsio-env-mxg8npxvtu.elasticbeanstalk.com",
      auth: "http://openseeds.io/auth/twitter" //"http://openseedsio-env-mxg8npxvtu.elasticbeanstalk.com/auth/twitter"
    },
    authRedirectPath: "#tweetlist", // No leading slash needed.  This becomes "[location of index.html]/#timeline".
    pointer: pointer
  }

  return SEEDS_CONFIG;
});