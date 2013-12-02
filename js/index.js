$(document).on('deviceready', function() {
    var $loginButton = $('#login a');
    var $loginStatus = $('#login p');
	var $logoutButton = $('#logout a');
	
	$logoutButton.hide();
	
	user.checkToken().done(function() {
		$loginButton.hide();
		$loginStatus.append('Du bist erfolgreich eingeloggt.');
	}).fail(function() {
		user.login();
	});
	
	
});
