/*
 * yAnalytics - channel information library.
 * © (2013) Dennis Nemec & Raphael Hauger
 *
 */

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
