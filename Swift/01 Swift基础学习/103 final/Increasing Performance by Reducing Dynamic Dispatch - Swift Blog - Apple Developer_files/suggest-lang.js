// window.addEventListener('DOMContentLoaded', () => {
((window, undefined) => {

	var storage = getStorage();

	var limit = {
		local: 2,
		session: 1,
	};

	const LanguageCallToAction = {
		'en': 'View in English',
		'zh_CN': '查看简体中文页面',
		'ja_JP': 'このページを日本語で見る',
		'ko_KR': '한국어로 보기',
		'de_DE': 'Deutsche Version anzeigen',
		'es_lamr': 'Ver en español latinoamericano',
		'fr_FR': 'Afficher la version française',
		'it_IT': 'Vedi la versione italiana',
		'pt_BR': 'Veja a versão em português (Brasil)',
	};

	// Cache values from the page

	const browserLang = navigator.language.toLowerCase();

	const pageLang = document.body.parentElement.lang
		.replace('-', '_');

	const alternates = Array.from(document.querySelectorAll("link[rel='alternate'][hreflang]"));

	const suggestLang = document.getElementById('suggest-lang');
	const suggestLink = document.getElementById('suggest-link');
	const suggestCloser = document.getElementById('suggest-closer');

	if(
		browserLang != pageLang &&
		storage.local < limit.local &&
		storage.session < limit.session)
	{

		const languages = Object.keys(window.LanguageLocales);

		languages.map((language) => {

			const locales = window.LanguageLocales[language];

			if(locales.includes(browserLang) && language !== pageLang)
			{

				alternates.map((alternate) => {

					if(alternate.hreflang.replace('-', '_') == language)
					{
						if(suggestLink)
						{
							suggestLink.href = alternate.href;
							suggestLink.text = LanguageCallToAction[language];
						}
						if(suggestLang)
						{
							suggestLang.classList.remove('hide');
						}
					}

				});

			}

		});

	}

	if(suggestCloser)
	{
		suggestCloser.onclick = () => {

			storage = getStorage();

			storage.local++;
			storage.session++;

			localStorage.setItem('suggestLang', storage.local);
			sessionStorage.setItem('suggestLang', storage.session);

			suggestLang.classList.add('hide');

		};
	}

	function getStorage() {

		var local = 0;
		var session = 0;

		if(localStorage.hasOwnProperty('suggestLang')) {
			if(!isNaN(parseInt(localStorage.getItem('suggestLang')))) {
				local = localStorage.getItem('suggestLang');
			}
		}

		if(sessionStorage.hasOwnProperty('suggestLang')) {
			if(!isNaN(parseInt(sessionStorage.getItem('suggestLang')))) {
				session = sessionStorage.getItem('suggestLang');
			}
		}

		return {
			local,
			session
		};

	}

// });
})(window);