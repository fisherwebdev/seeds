define(function () {

  window.app = window.app || {
    collections: {},
    models: {},
    views: {}
  };

  SEEDS_CONFIG = {
    api: {
      base: "http://openseedsio-env-mxg8npxvtu.elasticbeanstalk.com",
      auth: "http://openseedsio-env-mxg8npxvtu.elasticbeanstalk.com/auth/twitter"
    },
    authRedirectPath: "#tweetlist" // No leading slash needed.  This becomes "[location of index.html]/#timeline".
  }

  return SEEDS_CONFIG;
});