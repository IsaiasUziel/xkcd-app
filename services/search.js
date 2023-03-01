// Este archivo contiene la logica para hacer la busqueda en algolia, y se exporta como search.
// la intención de esto es porder re utilizar la logica de busqueda en algolia en cualquier parte de la app.
import algoliasearch from 'algoliasearch'
// get the env variables
const { ALGOLIA_APP_ID, ALGOLIA_APP_KEY, ALGOLIA_INDEX } = process.env // Node.js env variables
// Connect and authenticate with your Algolia app
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_APP_KEY)
// Create a new index and add a record
const index = client.initIndex(ALGOLIA_INDEX)

const CACHE = {}

export const search = async ({ query }) => {
	if (CACHE[query]) return { results: CACHE[query] }

	const { hits } = await index.search(query, {
		attributesToRetrieve: ['id', 'title', 'img', 'alt', 'safe_title', 'width', 'height'],
		hitsPerPage: 10
	})

	CACHE[query] = hits

	return { results: hits }
}