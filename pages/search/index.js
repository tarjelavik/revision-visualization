import { ReactiveBase, DataSearch, SelectedFilters, ReactiveList } from '@appbaseio/reactivesearch'
import { Box, Container, Grid, Heading, OrderedList, ListItem, Tag, Text } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Link from '../../components/Link'
import Filters from '../../components/Search/Filters'

export default function Search() {
  return (
    <Layout>
      <ReactiveBase
        app='all'
        url={`http://localhost:3000/api/search`}
        transformRequest={async (props) => ({
          ...props,
          url: props.url.replace('_msearch', '')
        })}
      /* theme={{
        typography: {
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Droid Sans", "Helvetica Neue", sans-serif',
          fontSize: "16px"
        },
        colors: {
          textColor: "#aaa",
          backgroundColor: "#212121",
          primaryTextColor: "#fff",
          primaryColor: "#2196F3",
          titleColor: "#fff",
          alertColor: "#d9534f",
          borderColor: "#666"
        }
      }} */
      >
        <Container mt={5} maxW="3xl">
          <Box>
            <DataSearch
              dataField={['identifier', 'title', 'description', 'comment', 'label', 'location.omeka_title', 'composedOf.omeka_title']}
              fieldWeights={[2, 1, 2, 2]}
              componentId="search"
              autosuggest={false}
              placeholder="Search ..."
            />
            <SelectedFilters />
          </Box>
          <Grid maxW="3xl" my="5" templateColumns="1fr 3fr" gap={[5]}>
            <Filters />
            <Box>
              <ReactiveList
                componentId="results"
                pagination
                paginationAt="both"
                react={{
                  and: ['search', 'Location'],
                }}
                dataField="id"
              >
                {({ loading, data, error }) => {
                  if (loading) {
                    return <p>Loading...</p>
                  }
                  if (error) {
                    return <p>Something Went Wrong!</p>
                  }
                  if (data.length) {
                    return (
                      <Grid columns={[1, 1, 2, 3]} gap={[1, 1, 2, 3]}>
                        {data.map((item) => (
                          <Box key={item._id} border="#aaa solid thin" p="3">
                            <Heading><Link href={`/book/${item['o:id']}`}>{item.title ?? item.shelfmark}</Link></Heading>
                            <Tag>{item.type?.[0]}</Tag><Tag>{`ID: ${item['o:id']}`}</Tag>
                            <Text>{item.referencesBirgitta === '1' ? 'References Birgitta' : ''}</Text>
                            <Text>Production date: {item.productionDate ?? 'Unknown'}</Text>
                            <Text>{item.ownedby?.label}</Text>
                            <Text>{item.location?.title}</Text>
                            <Text>{item.folios}</Text>
                            <Text>{item.writingSupport}</Text>
                            <Text>{item.leafPageDimensions}</Text>
                            {item.composedOf && item.composedOf?.length && (
                              <OrderedList>
                                {item.composedOf.map((c) => (
                                  <ListItem>{c.title}</ListItem>
                                ))}
                              </OrderedList>
                            )}
                            {item.composedOf && !item.composedOf.length && (
                              <OrderedList>
                                <ListItem>{item.composedOf.title ?? item.composedOf.shelfmark}</ListItem>
                              </OrderedList>
                            )}
                            {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                          </Box>
                        ))}
                      </Grid>
                    )
                  } else {
                    return <p>No Results Found</p>
                  }
                }}
              </ReactiveList>
            </Box>
          </Grid>
        </Container>
      </ReactiveBase >
    </Layout>
  )
}
