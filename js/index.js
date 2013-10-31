var CLIENT_ID = "";
var CLIENT_SECRET = "";
var CLIENT_SCOPES = [
    'https://www.googleapis.com/auth/yt-analytics.readonly',
    'https://www.googleapis.com/auth/youtube.readonly'
];

var user  = {
	
	authorize : function() {
		var deferred = $.deferred();
		
		var authUrl = 'https://accounts.google.com/o/oauth2/auth?' + $.param({
                       client_id: CLIENT_ID,
                       redirect_uri: "http://localhost",
                       response_type: 'code',
                       scope: CLIENT_SCOPES });
       
       var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');
       (authWindow).on('loadstart', function(e){
       	
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
          	        redirect_uri: "http,://localhost",
          	        grant_type: 'authorization_code' 
          	
          	}).done(function(data) {
          		deferred.resolve(data);
          	}).fail(function(response) {
          		deferred.reject(response.responseJSON);
          	});
          	
          } else if(error) {
          	deferred.reject({error: error[1]});
          }
       	
       });
       
       return deferred.promise();
	}
};

$(document).on('deviceready', function() {
	var $loginButton = "#login a";
	var $loginStatus = "#login p";
	
	user.authorize().done(function(data){
		$loginStatus.html = 'Access Token: ' + data.access_token;
	}).fail(function(data) {
		$loginStatus.html(data.error);
	});
});
