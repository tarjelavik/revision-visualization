import { Container, Heading } from '@chakra-ui/react'
import Layout from '../components/Layout'

export default function Index() {
  return (
    <Layout>
      <Heading>Hello world</Heading>
    </Layout>
  )
}

/* export async function getStaticProps({preview = false}) {
  const data = await getFrontpage(preview)
  return {
    props: {data, preview},
  }
} */
