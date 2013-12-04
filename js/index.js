var app = {
	init : function() {
		 var $loginButton = $('#login a');
		 var $loginStatus = $('#login p');
		 var $logoutButton = $('#logout a');
		 
		 $logoutButton.hide();
		 
		 $loginButton.on('click', function() {
		 	app.showLogin();
		 });
		 
		 auth.getToken().then(function() {
		 	$loginButton.hide();
		 	
		 	// Does not work!
		 	app.view();
		 }).fail(function() {
		 	app.showLogin();
		 }).done(function() {
		 	app.view();
		 	$loginStatus.append('It works!');
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
			$loginStatus.html('HEY');
	},
};


$(document).on('deviceready', function() {
	app.init();	
});
