(function() {
  // Retrieve your client ID from the Google APIs Console at
  // https://code.google.com/apis/console.
  var OAUTH2_CLIENT_ID = '122670225392-t8qh5ennnrqim2j7vrbc3vfa1td3sq5d.apps.googleusercontent.com';
  var OAUTH2_SCOPES = [
    'https://www.googleapis.com/auth/yt-analytics.readonly',
    'https://www.googleapis.com/auth/youtube.readonly'
  ];

  var ONE_MONTH_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

  // Keeps track of the currently authenticated user's YouTube user ID.
  var channelId;

  // For information about the Google Chart Tools API, see
  // https://developers.google.com/chart/interactive/docs/quick_start
  google.load('visualization', '1.0', {'packages': ['corechart']});

  // The Google APIs JS client invokes this callback automatically after loading.
  // See http://code.google.com/p/google-api-javascript-client/wiki/Authentication
  window.onJSClientLoad = function() {
    gapi.auth.init(function() {
      window.setTimeout(checkAuth, 1);
    });
  };

  // Attempt the immediate OAuth 2 client flow as soon as the page loads.
  // If the currently logged-in Google Account has previously authorized
  // OAUTH2_CLIENT_ID, then it will succeed with no user intervention.
  // Otherwise, it will fail and the user interface that prompts for
  // authorization will need to be displayed.
  function checkAuth() {
    gapi.auth.authorize({
      client_id: OAUTH2_CLIENT_ID,
      scope: OAUTH2_SCOPES,
      immediate: true
    }, handleAuthResult);
  }

  // Handle the result of a gapi.auth.authorize() call.
  function handleAuthResult(authResult) {
    if (authResult) {
      // Auth was successful. Hide auth prompts and show things
      // that should be visible after auth succeeds.
    } else {
      // Auth was unsuccessful. Show things related to prompting for auth
      // and hide the things that should be visible after auth succeeds.
      $('.post-auth').hide();
      $('.pre-auth').show();

      // Make the #login-link clickable. Attempt a non-immediate OAuth 2 client
      // flow. The current function will be called when that flow completes.
      $('#login-link').click(function() {
        gapi.auth.authorize({
          client_id: OAUTH2_CLIENT_ID,
          scope: OAUTH2_SCOPES,
          immediate: false
        }, handleAuthResult);
      });
    }
  }