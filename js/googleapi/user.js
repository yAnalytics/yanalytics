/*
 * yAnalytics - user information library.
 * © (2013) Dennis Nemec & Raphael Hauger
 *
 * Just summarized the most important functions. It's actually the same like auth.js. 
 * 
 * NOTICE:
 * as soon as possible I will add more specific user information like the ID, Name and so on.
 */

var user = {
	login: function() {
		auth.authorize();
	},
	
	checkToken: function() {
		auth.getToken();	
	}
};
