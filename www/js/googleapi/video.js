// set first the this.id to the id of video before you call some methods

function videoData() {
	this.id = "";
	this.title = getTitle;
	this.description = "";
	this.thumbnail = "";
	this.keywords = "";
	this.publishedAt = "";
	this.privacyStatus = "";
	
	
}

function getTitle() {
	return "hallo " + this.id;	
}
