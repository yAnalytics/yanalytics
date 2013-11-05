var CLIENT_ID = "122670225392-t8qh5ennnrqim2j7vrbc3vfa1td3sq5d.apps.googleusercontent.com";
var CLIENT_SECRET = "EE3T2nrELtAGGJIl9stXQq-2";
var CLIENT_SCOPES = 'https://www.googleapis.com/auth/yt-analytics.readonly';
var CLIENT_REDIRECT_URI = "http://localhost";

var token;

$(document).on('deviceready', function() {
    var $loginButton = $('#google_login');
    var $loginStatus = $('#login p');
	var $requestText = $('#login h1');
	
	$requestText.html('Initialize');
	
    $loginButton.on('click', function() {
		$.getScript("auth.js", function(){
			console.log('Script: auth.js has successfully loaded.');
			auth.getToken().done(function(data) {
				$loginStatus.add('Access token (not local) : ' + data.access_token);
				$loginStatus.add('Access token (local) : ' + localStorage.access_token);
				$loginStatus.add('Expires At (local) : ' + localStorage.expires_at);
			}).fail(function(data) {
				$loginStatus.add('An error has occoured: ' + data.error);
			});
			});
    });
});