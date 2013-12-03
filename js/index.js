var app = {
	init : function() {
		 var $loginButton = $('#login a');
		 var $loginStatus = $('#login p');
		 var $logoutButton = $('#logout a');
		 
		 $logoutButton.hide();
		 
		 $loginButton.on('click', function() {
		 	auth.authorize();
		 });
		 
		 auth.checkToken().done(function() {
		 	$loginButton.hide();
		 	$loginStatus.append('Du bist erfolgreich eingeloggt.');
		 	app.showView();
		 	}).fail(function() {
		 		auth.authorize();
		 		});
	},
	
	showView: function() {
		getUser({
			access_token: localStorage.access_token
		}).done(function(data) {
			$loginStatus.append('Hallo ' + data.name);
		}).fail(function() {
			app.init();
		});
	}
	
};


$(document).on('deviceready', function() {
	app.init();	
});
