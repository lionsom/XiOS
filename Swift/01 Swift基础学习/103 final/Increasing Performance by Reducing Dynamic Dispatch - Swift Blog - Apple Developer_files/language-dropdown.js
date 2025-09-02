window.addEventListener('DOMContentLoaded', () => {
	// Define the language strings
	
	var langs = {
		"en": "English",
		"zh-CN": "简体中文",
		"ja-JP": "日本語",
		"ko-KR": "한국어",
		"de-DE": "Deutsch",
		"es-lamr": "Español",
		"fr-FR": "Français",
		"it-IT": "Italiano",
		"pt-BR": "Português"
	}
	
	// Define the default language display order
	
	var order = [
		'en',
		'zh-CN',
		'ja-JP',
		'ko-KR',
		'de-DE',
		'es-lamr',
		'fr-FR',
		'it-IT',
		'pt-BR'
	];
	
	// Cache values from the page
	
	var pagelang = document.querySelector('html').getAttribute('navlang');
	if(pagelang === null) {
		var pagelang = document.querySelector('html').getAttribute('lang');
	}
	
	var alternates = document.querySelectorAll('link[rel="alternate"][hreflang]');
	var dropdown = document.querySelector('.language-dropdown');
	var menu = document.querySelector('.language-dropdown select');
	
	// If required data exists on page...
	
	if(order.includes(pagelang) && alternates.length > 1 && dropdown.getAttribute('data-lang') !== 'complete') {
		
		// Bubble up the current language
		
		if(order.includes(pagelang)) {
			order.splice(order.indexOf(pagelang), 1);
			order.unshift(pagelang);
		}
		
		// Loop through languages in order
		
		Object.entries(order).forEach(([index, lang]) => {
			
			// Locate language tag
			
			alternate = document.querySelector('link[rel="alternate"][hreflang="' + lang + '"]');
			
			// If language exists on page...
			
			if(alternate !== null) {
				
				// Create a new item for language
				
				var node = document.createElement('option');
				var href = alternate.getAttribute('href');
				var text = document.createTextNode(langs[lang]);
				
				node.appendChild(text);
				node.value = href;
				menu.appendChild(node);
				
				// If language matches current language...
				
				if(lang == pagelang) {
					
					// Set the menu to the current language
					
					menu.value = href;
					
				}
			}
		});
		
		// Add redirect based on language selection
		
		menu.addEventListener('change', function() {
			window.location = this.value;
		})
		
		// Swap visible language selector
		
		dropdown.classList.remove('hidden');
		dropdown.setAttribute('data-lang', 'complete');
	}
});