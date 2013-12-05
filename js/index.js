var $loginButton = $('#login a');
var $loginStatus = $('#login p');
var $logoutButton = $('#logout a');

var app = {
	init : function() {
		 var status = false;
		 
		 $logoutButton.hide();
		 
		 $loginButton.on('click', function() {
		 	app.showLogin();
		 });
		 
		 auth.getToken().done(function(data) {
		 	getUser({
		 		access_token: data.access_token
		 	}).done(function(data) {
		 		$loginStatus.append('Hallo ' + data.name);
		 	}).fail(function(data) {
		 		$loginStatus.append('Error: ' + data.error);
		 	});
		 	status = true;
		 }).fail(function(data) {
		 	$loginStatus.append('xD');
		 });
	},
	
	showLogin : function() {
		user.login().done(function(data) {
			app.init();
		}).fail(function(data) {
			$loginButton.append('Ein Fehler ist aufgetreten: <br>' + data.error);
		});
	},
	
	view : function() {
		channel.id().done(function(data) {
			$loginStatus.append('Deine ID ist: ' + data);
		});
	}
};


$(document).on('deviceready', function() {
	app.init();	
});
