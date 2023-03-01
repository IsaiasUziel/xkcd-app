import { PageLayout } from '@/components/PageLayout';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { readdir, readFile, stat } from 'fs/promises';
import { basename } from 'path';
import { Text } from '@nextui-org/react';

export default function Comic({ id, img, alt, width, height, title, prevId, nextId, hasPrev, hasNext }) {
	return (
		<>
			<PageLayout classMain='pt-4 pb-40'>
				<section className='max-w-lg px-4 m-auto'>
					<Text
						h2
						align='center'
						size={30}
						css={{
							textGradient: "45deg, $blue600 -20%, $pink600 50%",
						}}
						weight="bold"
						className='my-4'
					>
						{title}
					</Text>
					<div className="max-w-sm m-auto mb-4">
						<Image
							width={width}
							height={height}
							src={img}
							alt={alt}
							layout='responsive'
						/>
					</div>
					<p>{alt}</p>

					<div className="flex justify-between mt-6">
						{hasPrev && <Link href={`/comic/${prevId}`}>⬅ Prev</Link>}
						{hasNext && <Link href={`/comic/${nextId}`} className="ml-auto">Next ➡</Link>}
					</div>

				</section>
			</PageLayout>
		</>
	);
}

export async function getStaticPaths({ locales }) {
	const files = await readdir('./comics')
	let paths = []

	// locales es un array con los locales que tenemos en next.config.js ['en', 'es']
	locales.forEach(locale => {
		paths = paths.concat(files.map(file => {
			const id = basename(file, '.json')
			return { params: { id }, locale }
		}))
	})

	return {
		paths,
		fallback: false // true: si no encuentra el path, lo busca en el servidor, false: si no encuentra el path, muestra un 404
	}
}

export async function getStaticProps({ params }) {
	const { id } = params;
	const content = await readFile(`./comics/${id}.json`, "utf-8")
	const comic = JSON.parse(content);

	const idNumber = Number(id); // convertir a number
	const prevId = idNumber - 1;
	const nextId = idNumber + 1;

	const [prevResult, nextResult] = await Promise.allSettled([
		stat(`./comics/${prevId}.json`), // si no existe, lanza un error
		stat(`./comics/${nextId}.json`) // si no existe, lanza un error
	])

	const hasPrev = prevResult.status === "fulfilled";
	const hasNext = nextResult.status === "fulfilled";


	return {
		props: {
			...comic,
			prevId: hasPrev ? prevId : null,
			nextId: hasNext ? nextId : null,
			hasPrev,
			hasNext
		}
	}
}