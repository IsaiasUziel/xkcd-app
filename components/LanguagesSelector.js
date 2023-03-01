import Link from 'next/link';
import { useState } from 'react';

export function LanguagesSelector(props) {
	/* menu state */
	const [open, setOpen] = useState(false);

	const toggleMenu = () => {
		setOpen(!open);

		/* close if click outer component */
		document.addEventListener('click', (e) => {
			if (!e.target.closest('.relative')) {
				setOpen(false);
			}
		})
	}


	return (
		<>
			{/* tailwind dropdown */}
			<div className="relative inline-block text-left">
				<div>
					<button type="button" onClick={toggleMenu} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="options-menu" aria-expanded="true" aria-haspopup="true">
						{props.selectedLocale}
						<svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					</button>
				</div>
				{
					open ?
						<div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
							<div className="py-1" role="none">
								{
									props.restOfLocales.map(locale => {
										return (
											<Link href='/' key={locale} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" locale={locale} onClick={toggleMenu}>
												{locale}
											</Link>
										)
									})
								}
							</div>
						</div> : null
				}
			</div>
		</>
	);
}