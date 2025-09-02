(function(
	window,
	$,
	undefined)
{

	var ui = {};

	$(function() {

		// Cache UI elements

		ui.body = $('body');

		ui.nav = {};

		ui.nav.footerNavItems =
			ui.body.find('#directorynav h3');

		ui.nav.localNavItems =
			ui.body.find('.sub-title');
		
		ui.nav.localNavChevron =
			ui.body.find('.localnav-menustate');

		// Attach event listeners

		$(window)
			.on('scroll', onDidScroll);

		ui.nav.localNavItems
			.on('click', onDidClickLocalNavItem);
		
		ui.nav.localNavChevron
			.on('change', removeFocusOnLocalNavToggle);

		ui.nav.footerNavItems
			.on('click', onDidClickFooterNavItem);

	});

	function closeSubnavMenu() {

		ui.nav.localNavItems.map(function(index, item) {

			$(item)
				.parent()
				.removeClass('enhance')
				.find('ul')
				.removeClass('nav-reveal');

		});

	}

	function onDidScroll(e) {

		if(window.scrollY > 0) {

			closeSubnavMenu();

		}

	}

	function onDidClickFooterNavItem(e)
	{

		$(e.currentTarget)
			.toggleClass('enhance');

	}

	function onDidClickLocalNavItem(e)
	{

		$(e.currentTarget)
			.parent()
			.toggleClass('enhance')
			.find('ul')
			.toggleClass('nav-reveal');

	}

	function removeFocusOnLocalNavToggle()
	{
		document.activeElement.blur();
	}

}(
	window,
	window.jQuery
));
