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
	var statistics = channelReq.statistics();
	var status = channelReq.status();
	var chId = channelReq.id();
	var brandingSettings = channelReq.brandingSettings();
	var snippet = channelReq.snippet();
	var contentDetails = channelReq.contentDetails();
	
	this.title = snippet.items[0].snippet.title;
	this.id = chId.items[0].id;
	this.uploads = contentDetails.items[0].contentDetails.relatedPlaylists.uploads; // ID of the upload's playlist
	this.videoAmount = statistics.items[0].statistics.videoCount; // integer with the amount of videos
	this.status = status.items[0].status.privacyStatus; // only kind of privacy status
	this.description = snippet.items[0].snippet.description;
	this.bannerUrlMobile = brandingSettings.items[0].brandingSettings.image.bannerMobileImageUrl; // normal resolution
	this.bannerUrlMobileLow = brandingSettings.items[0].brandingSettings.image.bannerMobileLowImageUrl; // low resolution
	this.bannerUrlMobileMedium = brandingSettings.items[0].brandingSettings.image.bannerMobileMediumImageUrl; // medium resolution
	this.bannerUrlMobileHd = brandingSettings.items[0].brandingSettings.image.bannerMobileHdImageUrl; // hd
	this.bannerUrlMobileExtraHd = brandingSettings.items[0].brandingSettings.image.bannerMobileExtraHdImageUrl; // hd
	this.subscribers = statistics.items[0].statistics.subscriberCount; // integer with the amount of subscribers
	this.playlistAmount = ""; // integer with the amount of playlists
	this.playlists = ""; // array with id of all playlists
}
