((window, undefined) => {

	const SafeLocalStorage = {
		getItem: key => {

			try
			{
				return localStorage.getItem(key)
			}
			catch(_)
			{
				return null
			}
		},
		setItem: (key, value) => {

			try
			{
				localStorage.setItem(key, value)
			}
			catch(_)
			{

			}

		}
	}

	const StorageKey = {
		preferredColorScheme: 'developer.setting.preferredColorScheme',
	};

	window.Settings = Object.defineProperties(
		{},
		Object
			.keys(StorageKey)
			.reduce(
				(settings, name) => ({
					...settings,
					[name]: {
						get: () => SafeLocalStorage.getItem(StorageKey[name]),
						set: value => SafeLocalStorage.setItem(StorageKey[name], value),
					},
				}),
				{}
			)
	);

})(window);
