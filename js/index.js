var app = {
	init : function() {
		 var $loginButton = $('#login a');
		 var $loginStatus = $('#login p');
		 var $logoutButton = $('#logout a');
		 
		 var status = false;
		 
		 $logoutButton.hide();
		 
		 $loginButton.on('click', function() {
		 	app.showLogin();
		 });
		 
		 auth.getToken().done(function(data) {
		 	$loginStatus.append(" asdfasdf" + data.access_token);
		 	getUser({
		 		access_token: data.access_token
		 	}).done(function(data) {
		 		$loginStatus.append('Hallo ' + data.name);
		 		status = true;
		 	}).fail(function(data) {
		 		$loginStatus.append('Error: ' + data.error);
		 	});
		 }).fail(function(data) {
		 	$loginStatus.append('xD');
		 });
		 
		 if (status == true) {
		 	app.view();
		 } else {
		 	$loginStatus.append('Es ist irgendein Fehler aufgetreten.');
		 }
	},
	
	showLogin : function() {
		user.login().done(function(data) {
			app.init();
		}).fail(function(data) {
			$loginButton.append('Ein Fehler ist aufgetreten: <br>' + data.error);
		});
	},
	
	view : function() {
		$loginStatus.append("asdfhhhhder");
	},
};


$(document).on('deviceready', function() {
	app.init();	
});
