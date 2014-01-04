function videoData() {
	this.id = "";
	this.test = "red";
	this.title = getTitle();
}

function getTitle() {
	return "hallo " + this.test;	
}
