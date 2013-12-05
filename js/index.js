var $loginButton = $('#login a');
var $loginStatus = $('#login p');
var $logoutButton = $('#logout a');

var app = {
	init : function() {
		 $logoutButton.hide();
		 
		 $loginButton.on('click', function() {
		 	app.showLogin();
		 });
		 
		 $logoutButton.on('click', function() {
		 	auth.revokeToken().done(function(data) {
		 		app.init();
		 	}).fail(function(data) {
		 		$loginStatus.append('Es ist ein Fehler aufgetreten.');
		 	});
		 });
		 
		 auth.getToken().done(function(data) {
		 	$loginButton.hide();
		 	$logoutButton.show();
		 	
		 	user.getName({
		 		access_token: data.access_token
		 	}).done(function(data) {
		 		$loginStatus.append('Hallo ' + data.name);
		 		app.view();
		 	}).fail(function(data) {
		 		$loginStatus.append('Error: ' + data.error);
		 	});
		 	
		 }).fail(function(data) {
		 	$loginStatus.append('Logge dich bitte ein, um deine Statistiken aufrufen zu können.');
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
		}).fail(function() {
			$loginStatus.append('Es ist ein Fehler aufgetreten.');
		});
	}
};


$(document).on('deviceready', function() {
	app.init();	
});
