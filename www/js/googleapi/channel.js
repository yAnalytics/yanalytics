/*
 * yAnalytics - channel information library.
 * © (2013) Dennis Nemec & Raphael Hauger
 *
 */
jQuery.ajaxSetup({
   async: false
});

var channelReqLink = "https://www.googleapis.com/youtube/v3/channels";
var channelPlaylistItems = "https://www.googleapis.com/youtube/v3/playlistItems";

var access_token = "ya29.1.AADtN_VrBhyJ4kXvo_bF6Urk8x6WK88jegc23FT79tIxuXOsI2CbH7m0AFB99w";


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



// new kind of fetching data
function channelData() {
	// properties
	this.title = getChannelTitle;
	this.id = getChannelId;
	this.uploads = getUploadPlaylistId; // ID of the upload's playlist
	this.videoAmount = getVideoAmount; // integer with the amount of videos
	this.status = "hi"; 
	this.description = getChannelDescription;
	this.thumbnailUrl = ""; // It should actually be an array with multiple resolutions (small, medium,large)
	this.subscribers = ""; // integer with the amount of subscribers
	this.playlistAmount = ""; // integer with the amount of playlists
	this.playlists = ""; // array with id of all playlists
	// functions 
	this.getVideoIdByName = "";
	this.getVideoNameById = "";
	this.getVideoStatistics = ""; // call VideoStatistics class (ID of video is needed)
	this.getVideoData = new videoData(); // call VideoData class (ID of video is needed)
}

function getChannelId() {
	var id;
	$.getJSON(channelReqLink, {
		access_token: access_token,
		part: "id,snippet",
		mine: true
	},function(response) {
		id = response.items[0].id;
	});
	
	return id;
}

function getChannelTitle() {
	var title;	
	$.getJSON(channelReqLink, {
		access_token: access_token,
		part: "id,snippet",
		mine: true
	}, function(response) {
		title = response.items[0].snippet.title;
	});
	
	return title;
}

function getUploadPlaylistId() {
	var id;
	$.getJSON(channelReqLink, {
		access_token: access_token,
		part: "contentDetails",
		mine: true
	},function(response) {
		id = response.items[0].contentDetails.relatedPlaylists.uploads;
	});
	
	return id;
}

function getVideoAmount() {
    var amount;
    var upload = this.uploads;
    
	$.getJSON(channelPlaylistItems, {
		access_token: access_token,
		part: "id",
		playlistId: upload
	},function(response) {
		amount = response.pageInfo.totalResults;
	});
	return amount;
}

function getChannelDescription() {
	var description;
	$.getJSON(channelReqLink, {
		access_token: access_token,
		part: "id,snippet",
		mine: true
	},function(response) {
		description = response.items[0].snippet.description;
	});
	
	return description;
}

