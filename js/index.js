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
		 	$loginStatus.append(" asdfasdf" + data.access_token);
		 	app.view().done(function(data) {
		 		$loginStatus.append('Hmm.. irgendetwas stimmt nicht..');
		 	});
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
		return $loginStatus.html('HEY');
	},
};


$(document).on('deviceready', function() {
	app.init();	
});
