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
    
    if (localStorage.channelId) {
    	
	   $.getJSON('https://www.googleapis.com/youtube/analytics/v1/reports', 
	   {
	   	ids: 'channel==' + localStorage.channelId, 
	   	access_token: localStorage.access_token,
	    'start-date': '2013-10-01',
	   	'end-date': '2013-12-31',
	   	metrics: 'views'
	   }
	   
	   ).done(function(data) {
	   	$loginStatus.append("<br><b>Views: " + data.rows[0] + "</b>");
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

function channelData() {
	// properties	
	this.title = "";
	this.id = "";
	this.uploads = ""; // ID of the upload's playlist
	this.videoAmount = ""; // integer with the amount of videos
	this.status = ""; 
	this.description = "";
	this.thumbnail = ""; // It should actually be an array with multiple resolutions (small, medium,large)
	this.subscribers = ""; // integer with the amount of subscribers
	this.playlistAmount = ""; // integer with the amount of playlists
	this.playlists = ""; // array with id of all playlists
	// functions 
	this.getVideoIdByName = "";
	this.getVideoNameById = "";
	this.getVideoStatistics = ""; // call VideoStatistics class (ID of video is needed)
	this.getVideoData = new videoData(id); // call VideoData class (ID of video is needed)
}

var channelInfo = new channelData();
channelInfo.getVideoData.title;
