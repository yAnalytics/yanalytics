/*
 * yAnalytics - user information library.
 * © (2013) Dennis Nemec & Raphael Hauger
 *
 * Just summarized the most important functions. It's actually the same like auth.js. 
 * 
 * NOTICE:
 * as soon as possible more specific user information like the ID, Name and so on will be added.
 */

var user = {
	login: function() {
		return auth.authorize();
	},
	
	checkToken: function() {
		return auth.getToken();	
	},
	
	getName: function(options) {
		return $.getJSON('https://www.googleapis.com/oauth2/v1/userinfo', options);
	}
};

