import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './en.json';
import ru from './ru.json';

const languageDetector = {
	type: 'languageDetector',
	async: true,
	detect: (callback: (lang: string) => void) => {
		const locales = RNLocalize.getLocales();
		const supportedLangs = ['en', 'ru'];
		const bestLang = locales.find((locale) =>
			supportedLangs.includes(locale.languageCode)
		);
		callback(bestLang?.languageCode || 'en');
	},
	init: () => {},
	cacheUserLanguage: () => {},
};

i18n
	.use(languageDetector as any)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		resources: {
			en: { translation: en },
			ru: { translation: ru },
		},
	});

export default i18n;
