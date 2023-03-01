import Head from "next/head"

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function PageLayout({
	children,
	classMain = 'max-w-xl mx-auto py-4',
	headTitle = 'Comics for developers',
	metaDesc = 'Comic for developers'
}) {
	const title = `xkcd - ${headTitle}`
	return (<>
		<Head>
			<title>{title}</title>
			<meta name="description" content={metaDesc} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<Header />
		<main className={classMain}>
			{children}
		</main>
		<Footer />
	</>)
}