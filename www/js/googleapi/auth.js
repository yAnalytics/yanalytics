// yAnalytics - authentication with Google Server
// © (2013) Dennis Nemec & Raphael Hauger

/*
 With this file it's possible to connect to the authentication-server by Google
 */

var auth = {
	authorize : function() {
		var deferred = $.Deferred();

		// define the Url with the required parameters.
		var authUrl = "https://accounts.google.com/o/oauth2/auth?" + $.param({
			client_id : CLIENT_ID,
			redirect_uri : CLIENT_REDIRECT_URI,
			response_type : "code",
			scope : CLIENT_SCOPES
		});

		
		var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');

		$(authWindow).on('loadstart', function(e) {
			var url = e.originalEvent.url;
			var code = /\?code=(.+)$/.exec(url);
			var error = /\?error=(.+)$/.exec(url);

			if (code || error) {
				authWindow.close();
			}

			if (code) {
				authWindow.close();
				$.post('https://accounts.google.com/o/oauth2/token', {
					code : code[1],
					client_id : CLIENT_ID,
					client_secret : CLIENT_SECRET,
					redirect_uri : CLIENT_REDIRECT_URI,
					grant_type : 'authorization_code'
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
					error : error[1]
				});
			}
		});
/*	
		$(authWindow).on('exit', function(e) {
			loop = true;
		});
*/
		return deferred.promise();
	},

	getToken : function() {
		var deferred = $.Deferred();

		if (new Date().getTime() < localStorage.expires_at) {
			deferred.resolve({
				access_token : localStorage.access_token
			});
		} else if (localStorage.refresh_token) {
			$.post('https://accounts.google.com/o/oauth2/token', {
				refresh_token : localStorage.refresh_token,
				client_id : CLIENT_ID,
				client_secret : CLIENT_SECRET,
				grant_type : 'refresh_token'
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

	setToken : function(data) {
		localStorage.access_token = data.access_token;
		// access token
		localStorage.refresh_token = data.refresh_token || localStorage.refresh_token;
		// refresh token

		var expiresAt = new Date().getTime() + parseInt(data.expires_in, 10) * 1000 - 60000;
		// expires in
		localStorage.expires_at = expiresAt;
	},
	
	removeToken : function() {
		localStorage.clear();
	},

	revokeToken : function() {
		var deferred = $.Deferred();
		var link = "https://accounts.google.com/o/oauth2/revoke?token=";
		
		// send a post element
		$.post(link + localStorage.access_token).done(function(data) {
			console.log('Daten erfolgreich gelöscht.');
		 	auth.removeToken();
		 	
		 	var logoutUrl = "https://www.google.com/accounts/Logout";
		 	var logoutWindow = window.open(logoutUrl, '_blank', 'hidden=yes');
		 	
		 	$(logoutWindow).on('loadstart', function(e) {		 		
		 		$(logoutWindow).on('loadstop', function(event) {
		 			logoutWindow.close();
		 			window.close();
		 			deferred.resolve(data);
		 		});
		 		
		 	});
		 	
		}).fail(function(data) {
			Console.log(data.error);
			$loginStatus.append('Es ist ein Fehler aufgetreten!');
			deferred.reject();
		});
		
		return deferred.promise();
	}
};