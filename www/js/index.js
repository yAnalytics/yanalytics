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
		 et
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
		 	token = "ya29.1.AADtN_WwzXGNCBhnnjlLveVs1ndBA4i8ugrr_ELPU9KcL99t4qX3BPlXI__zAxuI";
		 			 	
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
			var info = new channelData();
	}
};


$(document).on('deviceready', function() {
	//app.init();
});	
