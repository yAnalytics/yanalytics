var $loginButton = $('#login a');
var $loginStatus = $('#login p');
var $logoutButton = $('#logout a');

var app = {
	init : function() {	

		
		 $logoutButton.hide();
		 $loginButton.show();
		 $loginStatus.html('');
		 
		 $loginButton.unbind().on('click', function() {
		 	app.showLogin();
		 });
		 
		$logoutButton.unbind().on('click', function() {
		 	auth.revokeToken().done(function(data) {
		 		console.log('Daten erfolgreich gelöscht.');
		 		$logoutButton.unbind();
		 		app.init();
		 	}).fail(function(data) {
		 		$loginStatus.append('Es ist ein Fehler aufgetreten.');
		 		$logoutButton.unbind();
		 		app.init();
		 	});
		 });
		 
		 auth.getToken().done(function(data) {
		 	$loginButton.hide();
		 	$logoutButton.show();
		 	
		 	localStorage.access_token = data.access_token;
		 	token = localStorage.access_token;
		 	alert(token);
		 	
		 	user.getName({
		 		access_token: data.access_token
		 	}).done(function(data) {
		 		$loginStatus.append('<br>Hallo ' + data.name);
		 		
		 		console.log('Rufe jetzt app.view() auf');
		 		app.view();
		 	}).fail(function(data) {
		 		$loginStatus.append('<br>Error: ' + data.error);
		 	});
		 	
		 }).fail(function(data) {
		 	$loginStatus.append('Logge dich bitte ein, um deine Statistiken aufrufen zu können.');
		 });
		 
		 $(loginButton).off();
	},
	
	showLogin : function() {
		user.login().done(function(data) {
			app.init();
		}).fail(function(data) {
			$loginButton.append('Ein Fehler ist aufgetreten: <br>' + data.error);
		});
	},
	
	view : function() {
		console.log("bin drin!");
			var info = new channelData();
        	$loginStatus.append("ID: " + info.id);
        	$loginStatus.append("<br>Upload-ID: " + info.uploads); 	
        	$loginStatus.append("<br>Titel: " + info.title);
        	$loginStatus.append("<br>Menge an Videos: " + info.thumbnailUrlDefault);
        	$loginStatus.append("<br>Beschreibung: " + info.subscribers);
        	$loginStatus.append("<br><img src='"+ info.bannerUrlMobileHd + "' alt='thumbnail' width='100%' height='50px'>");
	}
};


$(document).on('deviceready', function() {
	app.init();
});	
