function getUser(options) {
	$loginStatus.append('HEL');
	return $.getJSON('https://www.googleapis.com/oauth2/v1/userinfo', options);
}
