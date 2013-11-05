// yAnalytics - authentication with Google Server
// © Dennis Nemec & Raphael Hauger

/*
With this file it's possible to connect to the authentication-server by Google 
*/


var CLIENT_ID = "122670225392-t8qh5ennnrqim2j7vrbc3vfa1td3sq5d.apps.googleusercontent.com"; 
var CLIENT_SECRET = "EE3T2nrELtAGGJIl9stXQq-2";
var CLIENT_REDIRECT_URI = "http://localhost";
var CLIENT_SCOPES = "https://www.googleapis.com/auth/yt-analytics.readonly";


var auth = {
	getToken: function() {
		var deferred = $.Deferred();
		
		// define the Url with the required parameters.
		var authUrl = "https://accounts.google.com/o/oauth2/auth?" + $.param({
			client_id: CLIENT_ID,
			redirect_uri: CLIENT_REDIRECT_URI,
			response_type: "code",
			scope: CLIENT_SCOPES
		});
		
		var authWindow = window.open(authUrl, '_blank' , 'location=no,toolbar=no');
		
		$(authWindow).on('loadstart', function(e) {
			var url = e.originalEvent.url;
			var code = /\?code=(.+)$/.exec(url);
			var error = /\?error=(.+)$/.exec(url);
			
			if (code || error) {
				authWindow.close();
			}
			
			if (code) {
				$.post('https://accounts.google.com/o/oauth2/token' , {
					code: code[1],
					client_id: CLIENT_ID,
					client_secret: CLIENT_SECRET,
					redirect_uri: CLIENT_REDIRECT_URI,
					grant_type: 'authorization_code'
				}).done(function(data) {
					console.log('The login was successful');
					deferred.resolve(data);
					user.setToken(data);
				}).fail(function(response) {
					console.log(response.responseJSON);
					deferred.reject(response.responseJSON);
				});
			} else if (error) {
				deferred.reject({
					error: error[1]
				});
			}
		});
		
		return deferred.promise();
	},
	
	setToken: function(data) {
		localStorage.access_token = data.access_token; // access token 
		localStorage.refresh_token = data.refresh_token || localStorage.refresh_token; // refresh token
		
		var expiresAt = new Date().getTime() + parseInt(data.expires_in, 10) * 1000 - 60000; // expires in
        localStorage.expires_at = expiresAt;
	},
	
	refreshToken: function() {
		 // coming soon
	},
	
	revokeToken: function() {
		// coming soon
	}
};