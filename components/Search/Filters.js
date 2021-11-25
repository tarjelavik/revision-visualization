import { Box, Stack } from '@chakra-ui/react'
import { MultiList, SingleList, ToggleButton } from '@appbaseio/reactivesearch'

const AllFilters = () => (
  <>
    <Box border="solid thin #ddd">
      <SingleList componentId="Location" dataField="location.title" title="Location" />
      <SingleList componentId="Title" dataField="title" title="Title" loader="Loading ..." showFilter={true} showMissing={true} />
      <SingleList componentId="Folio" dataField="folios" title="Folio" loader="Loading ..." showFilter={true} showMissing={true} />
    </Box>
  </>
)

const Filters = () => {
  // eslint-disable-next-line no-unused-vars
  // const [isVisible, setIsVisible] = useState(true)

  /* const handleMobileView = () => {
    setIsVisible(!isVisible)
  } */

  return (
    <div>
      {/* <button
        type='button'
        onClick={handleMobileView}
        className={buttonStyles}
      >
        {`Show ${isVisible ? 'Results' : 'Filters'}`}
      </button> */}
      {/* <div className={filterWrapper(isVisible)}> */}
      <div>
        <AllFilters />
      </div>
    </div>
  )
}

export default Filters