$(document).on('deviceready', function() {
    var $loginButton = $('#google_login');
    var $loginStatus = $('#login p');
	var $requestText = $('#login h1');
	
	$requestText.html('Initialize');
	
    $.getScript('auth.js' , function() {
		$requestText.html('Success!');
	});
});
