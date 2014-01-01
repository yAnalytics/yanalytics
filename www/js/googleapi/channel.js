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
	
},

viewsLastMonth: function() {
	$loginStatus.append('Yeah! Ich bin in der viewsLastMonth-Funktion!');
    var deferred = $.Deferred();
	   $.getJSON('https://www.googleapis.com/youtube/analytics/v1/reports', 
	   {
	   	ids: 'channel==UCIZ97TeaJnB43tQnjgAhAiA', 
	   	acccess_token: localStorage.access_token,
	   	key: 'AIzaSyDpN1tfxXXS_GsRw50jaj-2TIKLKYHjnTk',
	    'start-date': '2013-10-01',
	   	'end-date': '2013-12-31',
	   	metrics: 'views'
	   }
	   
	   ).done(function(data) {
	   	$loginStatus.append(data.rows[0]);
	   	deferred.resolve(data.rows);
	   }).fail(function(data) {
	   	$loginStatus.append('Irgendetwas ist schief gelaufen.');
	   	deferred.reject();
	   });
   
    return deferred.promise();
}

};