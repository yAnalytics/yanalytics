var CLIENT_ID = "122670225392-t8qh5ennnrqim2j7vrbc3vfa1td3sq5d.apps.googleusercontent.com";
var CLIENT_SECRET = "EE3T2nrELtAGGJIl9stXQq-2";
var CLIENT_SCOPES = 'https://www.googleapis.com/auth/yt-analytics.readonly';
var CLIENT_REDIRECT_URI = "http://localhost";

var token;

var api = {
	authorize : function() {
		var deferred = $.Deferred();
		var authUrl = "https://accounts.google.com/o/oauth2/auth?" + $.param({
			client_id: CLIENT_ID,
			redirect_uri: CLIENT_REDIRECT_URI,
			response_type: "code",
			scope: CLIENT_SCOPES
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
				$.post('https://accounts.google.com/o/oauth2/token', {
					code: code[1],
					client_id: CLIENT_ID,
					client_secret: CLIENT_SECRET,
					redirect_uri: CLIENT_REDIRECT_URI,
					grant_type: 'authorization_code'
				}).done(function(data){
					deferred.resolve(data);
				}).fail(function(response){
					deferred.reject(response.responseJSON);
				});
			} else if(error) {
				deferred.reject({
					error: error[1]
				});
			}
		});
		
		return deferred.promise();
	}
};


$(document).on('deviceready', function() {
    var $loginButton = $('#google_login');
    var $loginStatus = $('#login p');
	var $requestText = $('#login h1');

    $loginButton.on('click', function() {
        api.authorize().done(function(data) {
        	$loginStatus.html('Access token: ' + data.access_token + '<br>' +
			                  'Refresh token: ' + data.refresh_token + '<br>'+ 
			                  'Expires in: ' + data.expires_in + '<br>' + 
			                  'Token type: ' + data.token_type + '<br>' ); 
		     
			 gapi.client.load('youtube' , 'v3' , function(){
				 gapi.client.load('youtubeAnalytics' , 'v1', function() {
					 var request = gapi.client.request({
					 mine: true,
					 part: 'id, contentDetails'
					 });
					 
					 request.execute(function(response) {
						 if ('error' in response) {
							 $requestText.html(response.error.message);
						 }
						$requestText.html(response.items[0].id); 
					 });
				 });
			});
			 
        
        }).fail(function(data) {
        	$loginStatus.html(data.error);
        });
      
    });
});