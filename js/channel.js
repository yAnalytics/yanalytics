function getUser(options) {
	return $.getJSON('https://www.googleapis.com/youtube/v3', options);
}
