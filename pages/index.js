import { PageLayout } from '@/components/PageLayout'
import { Card } from '@/components/Card'

import { Text } from '@nextui-org/react'

import fs from 'node:fs/promises'

import { useI18n } from '@/context/i18n'

const { readdir } = fs

export default function Home({ latestComics }) {
  const { t } = useI18n()

  return (
    <>
      <PageLayout title='Next XKCD'>
        <Text
          h2
          align='center'
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
          className='mb-8'
        >
          {t('LATEST_COMICS')}
        </Text>
        <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
          {latestComics && latestComics.map(comic => <Card key={comic.id} comic={comic} />)}
        </section>
      </PageLayout>
    </>
  )
}

export async function getStaticProps() {
  const files = await readdir('./comics')
  const latestComicsFiles = files.slice(-8, files.length).reverse()

  const promiseReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf-8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promiseReadFiles)

  return {
    props: {
      latestComics
    }
  }
}