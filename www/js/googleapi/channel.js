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
    var deferred = $.Deferred();
    $loginStatus.append("Bin drin!");
    
    if (localStorage.channelId) {
    	$loginStatus.append("Lokale ID ist vorhanden");
    	
	   $.getJSON('https://www.googleapis.com/youtube/analytics/v1/reports', 
	   {
	   	ids: 'channel==' + localStorage.channelId, 
	   	access_token: localStorage.access_token,
	    'start-date': '2013-10-01',
	   	'end-date': '2013-12-31',
	   	metrics: 'views'
	   }
	   
	   ).done(function(data) {
	   	$loginStatus.append("Views: " + data.rows[0]);
	   	deferred.resolve(data.rows);
	   }).fail(function(response) {
	   	$loginStatus.append("Something went wrong:");
	   	deferred.resolve(response);
	   });
    } else {
    	deferred.reject();
    }
    
    return deferred.promise();
},

getVideoIdByName: function() {
	
}


};