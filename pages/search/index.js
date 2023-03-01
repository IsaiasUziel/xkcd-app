import { PageLayout } from '@/components/PageLayout.js'
import { Card } from '@/components/Card.js';

import { search } from '@/services/search.js';

import { useI18n } from '@/context/i18n.js';

export default function Search({ search, results }) {
	const { t } = useI18n();
	return <>
		<PageLayout classMain='max-w-xl mx-auto py-4' headTitle={search
			? `Resultado para ${search}` : 'Search'} metaDesc={search ? `Resultados para ${search}` : 'Pagina search'}>
			<form className='flex flex-row justify-center items-center gap-4 py-8'>
				<input
					type="text"
					name="q"
					id="search"
					placeholder="Search"
					className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
				/>
				<button
					type="submit"
					className='bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'
				>
					Search
				</button>
			</form>
			{search && <h1 className='pb-8'>
				{t('SEARCH_RESULTS_TITLE', { count: results.length }, results.length || "0", search)}
			</h1>}
			{results &&
				<section className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
					{results && results.map(comic => <Card key={comic.id} comic={comic} />)}
				</section>
			}
		</PageLayout>
	</>
}

export async function getServerSideProps(context) {
	const { query } = context;
	const { q = '' } = query;

	// dont use fetch in getServerSideProps or getStaticProps because it will be executed in the server side and not in the client side.
	// no tiene sentido hacer un fetch a nuestro microservicio de search en el servidor, a un servicio externo si.
	/* const response = await fetch(`http://localhost:3000/api/search?q=${q}`)
	const results = await response.json(); */
	// fetch('https://external-host.com') ✅
	// fetch('https://mismo-host-o-localhost.com-de-next') ❌

	// microservice search @path: services/search.js
	const { results } = await search({ query: q })

	return {
		props: {
			search: q,
			results
		}
	}
}