// yAnalytics - authentication with Google Server
// © (2013) Dennis Nemec & Raphael Hauger

/*
With this file it's possible to connect to the authentication-server by Google 
*/


var CLIENT_ID = "122670225392-t8qh5ennnrqim2j7vrbc3vfa1td3sq5d.apps.googleusercontent.com"; 
var CLIENT_SECRET = "EE3T2nrELtAGGJIl9stXQq-2";
var CLIENT_REDIRECT_URI = "http://localhost";
var CLIENT_SCOPES = "https://www.googleapis.com/auth/yt-analytics.readonly";


var $loginButton = $('#login a');
var $loginStatus = $('#login p');

var $logoutButton = $('#logout a');

var auth = {
	authorize: function() {
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
					auth.setToken(data);
					deferred.resolve(data);
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
	
	getToken: function() {
        var deferred = $.Deferred();

        if (new Date().getTime() < localStorage.expires_at) {
            deferred.resolve({
                access_token: localStorage.access_token
            });
        } else if (localStorage.refresh_token) {
            $.post('https://accounts.google.com/o/oauth2/token', {
                refresh_token: localStorage.refresh_token,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'refresh_token'
            }).done(function(data) {
                auth.setToken(data);
                deferred.resolve(data);
            }).fail(function(response) {
                deferred.reject(response.responseJSON);
            });
        } else {
            deferred.reject();
        }

        return deferred.promise();
	},
	
	setToken: function(data) {
		localStorage.access_token = data.access_token; // access token 
		localStorage.refresh_token = data.refresh_token || localStorage.refresh_token; // refresh token
		
		var expiresAt = new Date().getTime() + parseInt(data.expires_in, 10) * 1000 - 60000; // expires in
        localStorage.expires_at = expiresAt;
	},
	
	removeLocalToken: function() {
		
	},
	
	revokeToken: function() {
		$loginStatus.append('Du bist nun in der revokeToken() Funktion!');
	}
};

var app = {
	init : function() {	
		$logoutButton.hide();
		
		$('#login a').on('click', function() {
			app.authUser();
		});
		
		
		$loginStatus.append('Überprüfe, ob schon ein Token vorhanden ist. <br>');
		
		auth.getToken().done(function(data) {
			app.showSomething(data);
		}).fail(function() {
			app.onButtonclick();
		});
	},
	
	authUser : function() {
		auth.authorize()
		.done(function(data) {
			app.showSomething(data);
		}).fail(function() {
			app.onButtonClick();
		});
	},
	
	showSomething : function(data) {
		$loginButton.hide();
		$logoutButton.show();
		$('#logout a').on('click', auth.revokeToken());
		$loginStatus.append('<br>Du bist eingeloggt. Auth code: ' + data.access_token);
		$loginStatus.append('<br>Local Auth Code: ' + localStorage.access_token);
	}
};

$(document).on('deviceready' , function() {
	app.init();
});