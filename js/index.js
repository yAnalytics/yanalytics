var app = {
	init : function() {
		 var $loginButton = $('#login a');
		 var $loginStatus = $('#login p');
		 var $logoutButton = $('#logout a');
		 
		 $logoutButton.hide();
		 
		 $loginButton.on('click', function() {
		 	app.showLogin();
		 });
		 
		 auth.getToken().done(function(data) {
		 	$loginStatus.append(data.refresh_token);
		 	app.view();
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
		$loginStatus.html('HEY');
	},
};


$(document).on('deviceready', function() {
	app.init();	
});
