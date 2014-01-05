// yAnalytics - authentication with Google Server
// © (2013) Dennis Nemec & Raphael Hauger

/*
In this .js file a seperate class will be defined for calling the googli api. That makes the api handling much easier.
 */
jQuery.ajaxSetup({
   async: false
});

var channelReqLink = "https://www.googleapis.com/youtube/v3/channels";
var channelPlaylistItems = "https://www.googleapis.com/youtube/v3/playlistItems";
var access_token = "ya29.1.AADtN_Vl7BGnSyd0g24vUDiPrq4wCFA4M0uJVg7KMq96zCVyiiHyd7rYfo23auNG2ITX3g";

function doRequest(url, options) {
	return $.getJSON(url, options);
}


var channelReq = {	
    id : function() {
		var id_data;
	$.getJSON(channelReqLink, {
		access_token: access_token,
		part: "id",
		mine: true,
		maxResults: 50 
	}, function(response) {
		id_data = response;
	});
	
	return id_data;
	},
	contentDetails : function() {
		var Details;
	$.getJSON(channelReqLink, {
		access_token: access_token,
		part: "contentDetails",
		mine: true,
		maxResults: 50
	}, function(response) {
		Details = response;
	});
	
	return Details;
	},
	
	snippet : function() {
		var snippet_details;
	$.getJSON(channelReqLink, {
		access_token: access_token,
		part: "snippet",
		mine: true,
		maxResults: 50
	}, function(response) {
		snippet_details = response;
	});
	
	return snippet_details;
	},
	
    statistics : function() {
		var stats;
	$.getJSON(channelReqLink, {
		access_token: access_token,
		part: "statistics",
		mine: true,
		maxResults: 50
	}, function(response) {
		stats = response;
	});
	
	return stats;
	},
	    
	topicDetails : function() {
		var topic_details;
	$.getJSON(channelReqLink, {
		access_token: access_token,
		part: "topicDetails",
		mine: true,
		maxResults: 50
	}, function(response) {
		topic_details = response;
	});
	
	return topic_details;
	},
	
    status : function() {
		var status_details;
	$.getJSON(channelReqLink, {
		access_token: access_token,
		part: "status",
		mine: true,
		maxResults: 50
	}, function(response) {
		status_details = response;
	});
	
	return status_details;
	},
	
	brandingSettings : function() {
		var brandingSettings;
	$.getJSON(channelReqLink, {
		access_token: access_token,
		part: "brandingSettings",
		mine: true,
		maxResults: 50
	}, function(response) {
		brandingSettings = response;
	});
	
	return brandingSettings;
	},
	
    invideoPromotion : function() {
		var invideo_promo;
	$.getJSON(channelReqLink, {
		access_token: access_token,
		part: "invideoPromotion",
		mine: true,
		maxResults: 50
	}, function(response) {
		invideo_promo = response;
	});
	
	return invideo_promo;
	},
	
	// must be youtube partner
	auditDetails : function() {
		var audit;
	$.getJSON(channelReqLink, {
		access_token: access_token,
		part: "auditDetails",
		mine: true,
		maxResults: 50
	}, function(response) {
		audit = response;
	});
	
	return audit;
	}
};
