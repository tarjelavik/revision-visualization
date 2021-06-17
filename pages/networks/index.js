import { Flex, HStack } from '@chakra-ui/layout'
import { Box, Button, Checkbox, CheckboxGroup, Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  List } from "@chakra-ui/react"
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import DataDrawerDisplayProperty from '../../components/DataDrawerDisplayProperty'
import { desiredProps, getDisplayType } from '../helpers';

const initialState = {
  resourceTemplates: [],
  isLoading: false,
  displayGraph: false,
  formData: [],
  selectedClasses: [
    "13", 
    "16"
  ],
  nodeData: null,
  displayDrawer: true,
}

const filterProps = (nodeData) => {
  // We need to set a guard against a null object here
  nodeData = nodeData || {foo: 'bar'};
  const filteredProps = [];

  for (const key in nodeData) {
      if (desiredProps.includes(key)) {
          filteredProps.push(nodeData[key][0]);
      }
  }

  return filteredProps;
};

const getLinkToResource = (nodeData) => {
  try {
     return `https://birgitta.test.uib.no/s/birgitta/item/${nodeData['o:id']}`;
  } catch {
      return '';
  }
};

const SigmaWithNoSSR = dynamic(() => import('../../components/SigmaBox'), {ssr: false})

export default function Networks() {
  const [state, setState] = useState(initialState)
  const { onClose } = useDisclosure();

  const nodes = filterProps(state.nodeData);
  const linkToResource = getLinkToResource(state.nodeData);

  const getTemplates = async () => {
    const response = await fetch(`api/graph/templates`);
    const body = await response.json();
    setState({
      ...state,
      resourceTemplates: body
    })
  }

  const getClickedNodeData = async (id) => {
    const response = await fetch(`api/graph/node/${id}`);
    try {
      const body = await response.json();
      console.log(body)
      setState({
        ...state,
        nodeData: body
      });
    } catch (error) {
      // TODO: Handle this is a more elegant manner which lets end user know that something is wrong.
      console.log(error);
    }
  }

  const setDisplayDrawer = (bool) => {
    setState({
      ...state,
      displayDrawer: bool
    });
  }
  
  useEffect(() => {
    getTemplates() 
  }, [])
  
  return (
    <Layout>
      <Flex
        as="header"
        align="center"
        justify="center"
        wrap="wrap"
        padding={2}
        w="full"
        bgColor="gray.100"
        borderColor="gray.600"
        borderBottom="solid 2px"
      >
        <Box mr="5"><strong>Build your network:</strong></Box>
        <CheckboxGroup 
          colorScheme="teal" 
          defaultValue={state.selectedClasses}
          onChange={(e) => setState({
            ...state,
            selectedClasses: e
          })}
        >
          <HStack spacing={10} direction="row">
            {state.resourceTemplates && state.resourceTemplates.map(template => (
              <Checkbox size="md" value={template.id} key={template.id}>
                {template.label}
              </Checkbox>
            ))}
          </HStack>
        </CheckboxGroup>
        {/* <Button>Apply</Button> */}
      </Flex>

      {state.resourceTemplates && (
        <SigmaWithNoSSR 
          classes={state.selectedClasses}  
          getClickedNodeData={getClickedNodeData}
          setDisplayDrawer={setDisplayDrawer}
          /* graph={graph} */ 
        /> 
      )};
      
      {/* <pre>
        {JSON.stringify(state, null, 2)}
      </pre> */}
      {state.nodeData ?
        <Drawer
          isOpen={state.displayDrawer}
          placement='right'
          onClose={onClose}
          trapFocus={false}
          onOverlayClick={() => setDisplayDrawer(false)}
          onEsc={() => setDisplayDrawer(false)}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerHeader>{getDisplayType(state.nodeData['@type'][1])}</DrawerHeader>
              <DrawerBody>
                <List>
                  {nodes.length && nodes.map((element, index) => (
                    <DataDrawerDisplayProperty 
                      key={index} 
                      propKey={element['property_label']} 
                      value={element['display_title'] || element['@value']}
                    />
                  ))}
                  <DataDrawerDisplayProperty 
                    propKey="Link to Record" 
                    value={
                      <a href={linkToResource} 
                        target='_blank' 
                        rel='noopener noreferrer'>See full resource page
                      </a>
                    }
                  />
                </List>
              </DrawerBody>
              <DrawerFooter>
                <Button onClick={() => setDisplayDrawer(false)}>Close</Button>
              </DrawerFooter>
            </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      : null}
    </Layout>
  )
}
