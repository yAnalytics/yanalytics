var $loginButton = $('#login a');
var $loginStatus = $('#login p');
var $logoutButton = $('#logout a');

loop = true;
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
		 	
		 	user.getName({
		 		access_token: data.access_token
		 	}).done(function(data) {
		 		$loginStatus.append('<br>Hallo ' + data.name);
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
		channel.id().done(function(data) {
			$loginStatus.append('<br>Deine ID ist: ' + data);
			localStorage.channelId = data;
			$loginStatus.append('<br>Die lokale ID: ' + localStorage.channelId);
			
		    /*channel.viewsLastMonth().done(function(response) {
				$loginStatus.append('Es hat geklappt');
			}).fail(function(error) {
				$loginStatus.append('Es gab einen Fehler: <br>');
		   });*/
		  
		  JSON.stringify(channel.views());
			
		}).fail(function() {
			$loginStatus.append('Es ist ein Fehler aufgetreten.');
		});
			
	}
};


$(document).on('deviceready', function() {
	app.init();	
});
