var app = {
	init : function() {
		 var $loginButton = $('#login a');
		 var $loginStatus = $('#login p');
		 var $logoutButton = $('#logout a');
		 
		 $logoutButton.hide();
		 
		 $loginButton.on('click', function() {
		 	app.showLogin();
		 });
		 
		 user.checkToken().done(function() {
		 	$loginButton.hide();
		 	$loginStatus.append('Du bist erfolgreich eingeloggt.');
		 	app.showView();
		 	}).fail(function() {
		 		app.showLogin();
		 	});
	},
	
	showLogin : function() {
		user.login().done(function(data) {
			app.init();
		}).fail(function(data) {
			$loginButton.append('Ein Fehler ist aufgetreten: <br>' + data.error);
		});
	},
	
	showView: function() {
		$loginStatus.append('Du bist in der showView() funktion!');
	}
	
};


$(document).on('deviceready', function() {
	app.init();	
});
