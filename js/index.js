$(document).on('deviceready', function() {
    var $loginButton = $('#login a');
    var $loginStatus = $('#login p');
	var $logoutButton = $('#logout a');
	
	$logoutButton.hide();
	
	$loginButton.on('click', function() {
		user.login();
	});
	
	auth.getToken().done(function() {
		$loginButton.hide();
		$loginStatus.append('Du bist erfolgreich eingeloggt.');
	}).fail(function() {
		$loginStatus.append('Nicht richtig.');
		auth.authorize();
	});
	
	
});
