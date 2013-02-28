define(function () {

  window.app = window.app || {
    collections: {},
    models: {
      users: {}
    },
    views: {
      users: {}
    },
    mainViewList: ["homeTimeline", "mentionsTimeline", "meTimeline", "me"]
  };

  console.log(window.app);

  SEEDS_CONFIG = {

    api: {
      base: "http://localhost:3000",
      auth: "http://localhost:3000/auth/twitter"
    },
    authRedirectPath: "#timeline" // No leading slash needed.  This evaluates as "[location of index.html]/timeline/home".

  }

  return SEEDS_CONFIG;

});