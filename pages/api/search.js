// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// en la carpeta api se pueden crear funciones que se ejecutan en el servidor, en este caso se crea una funcion que se ejecuta en el servidor y se exporta como handler.
// para que se ejecute en el servidor, se debe llamar desde el cliente con fetch, axios, etc.
// estos servicios se pueden usar para hacer llamadas a una api externa, por ejemplo a algolia, o a una api propia.
// son endpoints que se pueden llamar desde el cliente, pero se ejecutan en el servidor.
// desde el navegador se puede llamar a la ruta /api/search?q=algo
import {search} from '@/services/search.js'

export default async function handler(req, res) {
  const { query: { q } } = req
  
  const { results } = await search({ query: q })
  
  return res.status(200).json(results)
}
