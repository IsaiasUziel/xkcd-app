import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import { createContext } from "react";
import es from "@/languages/es.json";
import en from "@/languages/en.json";

const I18nContext = createContext();

const languages = { es, en };

// provider to use i18n
export function I18nProvider({ children }) {
	const { locale } = useRouter()
	const t = useCallback((key, options, ...args) => {
		let translation
		
		const { count = 0 } = options || {}
		// "key": "singular |||| plural"
		const splitted = languages[locale][key].split(' |||| ')
		
		if (splitted.length !== 2){
			translation = languages[locale][key]
		}else{
			const [singular, plural] = splitted
			translation = count === 1 ? singular : plural
		}
		

		// no translation found
		if (args.length === 0) return translation

		// ${1} ${2}
		return translation.replace(/\$\{(\d+)\}/g, (match, number) => {
			return args[number - 1] || match
		})
	}, [locale])

	return (
		<I18nContext.Provider value={{ t }}>
			{children}
		</I18nContext.Provider>
	);
}

// custom hook to use i18n
export function useI18n() {
	const context = useContext(I18nContext);
	if (context === undefined) {
		throw new Error("useI18n must be used within a I18nProvider");
	}
	return context;
}