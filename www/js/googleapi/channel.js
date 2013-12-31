/*
 * yAnalytics - channel information library.
 * © (2013) Dennis Nemec & Raphael Hauger
 *
 */


var channel = {	
id : function() {
	var deferred = $.Deferred();
		
	$.getJSON('https://www.googleapis.com/youtube/v3/channels', 
	{
		access_token : localStorage.access_token,
		mine: true,
		part: 'id,snippet'
	}
	).done(function(data) {
		tmp = data.items[0].id;
		deferred.resolve(data.items[0].id);
	}).fail(function(data) {
		deffered.reject();
	});
	
	return deferred.promise();
},

name: function(options) {
},

logo : function(options) {
	
}

};