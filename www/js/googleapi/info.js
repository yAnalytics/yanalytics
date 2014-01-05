// yAnalytics - authentication with Google Server
// © (2013) Dennis Nemec & Raphael Hauger

/*
 The saved data are needed for authorizing with the Google server.
 
 CLIENT_ID : the client id which can found in the Google developer console.
 CLIENT_SECRET: the secret code of your registered application. Can also found in the Google developer console.
 CLIENT_REDIRECT_URI: the location where you will be redirected after logging in.
 CLIENT_SCOPES: the needed access of specific account information. e.g. YouTube Analytics oder Google+
 
 */


var CLIENT_ID = "122670225392-t8qh5ennnrqim2j7vrbc3vfa1td3sq5d.apps.googleusercontent.com";
var CLIENT_SECRET = "EE3T2nrELtAGGJIl9stXQq-2";
var CLIENT_REDIRECT_URI = "http://localhost";
var CLIENT_SCOPES =  'https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics-monetary.readonly https://www.googleapis.com/auth/youtubepartner-channel-audit';
var API_KEY = 'AIzaSyDpN1tfxXXS_GsRw50jaj-2TIKLKYHjnTk';
