// yAnalytics - authentication with Google Server
// © (2013) Dennis Nemec & Raphael Hauger

/*
In this .js file a seperate class will be defined for calling the googli api. That makes the api handling much easier.
 */


function doRequest(url, options) {
	return $.getJSON(url, options);
}
