function getUser(options) {
	$loginStatus.append('HEL');
	return $.getJSON('https://www.googleapis.com/oauth2/v1/userinfo', options);
}

function getChannel(options) {
	var deferred = $.Deferred();
	var JSON = $.getJSON('https://www.googleapis.com/youtube/v3', options);
	
	if (JSON) {
		deferred.resolve(JSON);
	}
	
	return deferred.promise();
	
}
