import { useI18n } from '@/context/i18n.js';
import { Text, Navbar, Link, } from '@nextui-org/react';
import { useRouter } from 'next/router.js';
import { useState, useRef } from 'react';

import { LanguagesSelector } from './LanguagesSelector.js';

// export without default as a named export to be used in other files as exa in pages/index.js as import { Header } from '@/components/Header' and call it as <Header />
export function Header() { // Header with nextui
	const [results, setResults] = useState([])
	const searchRef = useRef()

	const { locale, locales } = useRouter()

	const getValue = () => searchRef.current?.value


	const handleChange = () => {
		const q = getValue()

		if (!q) return setResults([])

		fetch(`/api/search?q=${q}`)
			.then(res => res.json())
			.then(serachResults => setResults(serachResults))
	}

	const showLocales = () => {
		const restOfLocales = locales.filter(l => l !== locale)

		return {
			selectedLocale: locale,
			restOfLocales
		}
	}

	const { t } = useI18n()

	return (
		<>
			<Navbar isBordered variant='sticky'>
				<Navbar.Brand>
					<Text b color="inherit">
						<Link href="/" className='transition hover:ease-in-out'>
							Next XKCD
						</Link>
					</Text>
				</Navbar.Brand>
				<Navbar.Content>
					<Navbar.Link href="/">{t('HOME')}</Navbar.Link>
					<Navbar.Link href="/search">{t('SEARCH_PAGE')}</Navbar.Link>
					<li>
						<div className="relative">
							<input ref={searchRef} type="search" onChange={handleChange} className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent' />
							{
								Boolean(results.length) ?
									<ul className='absolute top-12 left-0 bg-slate-50 p-2 w-full shadow-xl overflow-auto search-result'>
										<li key="all-results">
											<Link href={`/search?q=${getValue()}`} className='block p-2 hover:bg-slate-100'>
												{t('SEARCH_RESULTS_TITLE', { count: results.length }, results.length || "0", getValue())}
											</Link>
										</li>
										{results.map(result => {
											return (
												<li key={result.id}>
													<Link href={`/comic/${result.id}`} className='block p-2 hover:bg-slate-100'>
														{result.safe_title}
													</Link>
												</li>
											)
										})}
									</ul> : null
							}
						</div>
					</li>
					<li>
						{
							locales.length > 1 ?
								<LanguagesSelector {...showLocales()} /> : null
						}
					</li>
				</Navbar.Content>
			</Navbar>
			<style jsx>{`
				.search-result {
					max-height: 300px;
				}
			`}</style>
		</>
	);
}