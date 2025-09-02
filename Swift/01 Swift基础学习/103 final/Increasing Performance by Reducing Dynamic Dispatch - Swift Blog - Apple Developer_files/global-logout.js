(function(
	window,
	$,
	undefined)
{

	var LOGOUT_LINK_MATCH = /^\/logout(\/)?/g;

	var localStorage = hasLocalStorageClientSupport() ?
		window.localStorage :
		{};

	var ui = {};

	$(function() {

		// Cache UI elements

		ui.body = $('body');

		ui.logoutLinks =
			ui.body.find('a[href*="logout"]');

		// Attach event listeners

		ui.logoutLinks
			.on('click', onDidClickLogoutLink);

	});

	function onDidClickLogoutLink(e) {

		var anchorElem = $(e.currentTarget);

		if(anchorElem.attr('href').match(LOGOUT_LINK_MATCH) !== null) {

			localStorage.csrf = null;

			localStorage.csrf_ts = null;

		}

	}

	function hasLocalStorageClientSupport()
	{

		if(!('localStorage' in window) || !window.hasOwnProperty('localStorage')) {
			return false;
		}

		try {

			window.localStorage.time = Date.now();

			return true;

		} catch(e) {

			return false;

		}

	}

}(
	window,
	window.jQuery
));
