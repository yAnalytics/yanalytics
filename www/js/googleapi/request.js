// yAnalytics - authentication with Google Server
// © (2013) Dennis Nemec & Raphael Hauger

/*
In this .js file a seperate class will be defined for calling the googli api. That makes the api handling much easier.
 */
jQuery.ajaxSetup({
   async: false
});

// channel stuff
var channelReqLink = "https://www.googleapis.com/youtube/v3/channels";
var channelPlaylistItems = "https://www.googleapis.com/youtube/v3/playlistItems";

// video stuff
var videoSearchReqLink = "https://www.googleapis.com/youtube/v3/search";
var PlaylistItemsLink = "https://www.googleapis.com/youtube/v3/playlistItems";

var token = "ya29.1.AADtN_W54MMXAIib0rwHlJ-jBSxCIK3vCXsQKp0hpd700mgKYEq1XIOUFli7FPBx" ;

function doRequest(url, options) {
	return $.getJSON(url, options);
}


var channelReq = {	
    id : function() {
		var id_data;
	$.getJSON(channelReqLink, {
		access_token: token,
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
		access_token: token,
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
		access_token: token,
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
		access_token: token,
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
		access_token: token,
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
		access_token: token,
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
		access_token: token,
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
		access_token: token,
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
		access_token: token,
		part: "auditDetails",
		mine: true,
		maxResults: 50
	}, function(response) {
		audit = response;
	});
	
	return audit;
	}
};




// PLAYLIST
var PlaylistItems = {
   contentDetails : function(nextPageToken , playlistid) {
		var items;
		
	 $.getJSON(PlaylistItemsLink, {
		access_token: token,
		part: "contentDetails",
		mine: true,
		maxResults: 5,
		playlistId: playlistid,
		nextPageToken: nextPageToken
	  }, function(response) {
		items = response;
	  });
	return items;
	},
	
	search : function(q , playlistid) {
	var items;
		
	 $.getJSON(videoSearchReqLink, {
		access_token: token,
		part: "id,snippet",
		forMine: true,
		maxResults: 5,
		type: "video"
	  }, function(response) {
		items = response;
	  });
	return items;
	}
};
