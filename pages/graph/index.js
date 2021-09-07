import Layout from '../../components/Layout'
import dynamic from 'next/dynamic'

const OntodiaViewerWithNoSSR = dynamic(() => import('../../components/OntodiaViewer'), { ssr: false })

export default function Graph() {
  return (
    <Layout>
      <OntodiaViewerWithNoSSR />
    </Layout>
  )
}
