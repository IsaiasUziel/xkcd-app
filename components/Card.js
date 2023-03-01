import Image from 'next/legacy/image'
import Link from 'next/link'

export function Card({comic: {id, img, width, height, alt, safe_title}}) {
	return (
		<Link href={`/comic/${id}`} className="mb-4 pb-4 m-auto transition hover:scale-110 z-10">
			<h3 className='font-semibold text-sm text-center pb-2'>
				{safe_title}
			</h3>
			<Image
				src={img}
				alt={alt}
				width={width || 400}
				height={height || 400}
				className="aspect-square pt-4"
			/>
		</Link>
	);
}