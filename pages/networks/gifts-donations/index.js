import {
  Container,
  Flex,
  HStack,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/layout';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  useDisclosure,
  List,
  SlideFade,
  CloseButton,
  Heading, Divider,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerContent, DrawerOverlay,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import DataDrawerDisplayProperty from '../../../components/DataDrawerDisplayProperty';
import { desiredProps, getDisplayType } from '../../../lib/helpers';
import HeaderNetworks from '../../../components/Layout/HeaderNetworks';

const initialState = {
  resourceTemplates: [],
  selectedClasses: ['13', '16'],
  nodeData: null,
  clickedEdgeInfo: null, // clickedEdgeInfo stores information related to a clicked edge -Rui
  clickedNodeInfo: null, // clickedNodeInfo stores information related to a clicked node -Rui
};

const filterProps = (nodeData) => {
  // We need to set a guard against a null object here
  nodeData = nodeData || { foo: 'bar' };
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
    return `https://birgitta.uib.no/s/birgitta/item/${nodeData['o:id']}`;
  } catch {
    return '';
  }
};

const SigmaWithNoSSR = dynamic(() => import('../../../components/SigmaBox'), {
  ssr: false,
});

const Networks = () => {
  const [state, setState] = useState(initialState);
  const { isOpen, onClose, onToggle } = useDisclosure();
  // Add two more triggers below for the feedback of the clickecd edge/node -Rui
  const { isOpen: isOpenClickedEdge, onClose: onCloseClickedEdge, onToggle: onToggleClickedEdge } = useDisclosure();
  const { isOpen: isOpenClickedNode, onClose: onCloseClickedNode, onToggle: onToggleClickedNode } = useDisclosure();

  const nodes = filterProps(state.nodeData);
  const linkToResource = getLinkToResource(state.nodeData);

  const getTemplates = async () => {
    const response = await fetch('/api/graph/templates');
    const body = await response.json();
    setState({
      ...state,
      resourceTemplates: body,
    });
  };

  // add another argument nodeInfo and set its state -Rui
  const getClickedNodeDataInfo = async (id, nodeInfo) => {
    const response = await fetch(`/api/graph/node/${id}`);
    try {
      const body = await response.json();
      console.log('print body when getClickedNodeDataInfo is called', body);
      console.log('print body when getClickedNodeDataInfo is called', nodeInfo);
      setState({
        ...state,
        nodeData: body,
        clickedNodeInfo: nodeInfo, // set nodeInfo -Rui
      });
    } catch (error) {
      // TODO: Handle this is a more elegant manner which lets end user know that something is wrong.
      console.log(error);
    }
  };

  // getClickedEdgeInfo gets clicked edge info -Rui
  const getClickedEdgeInfo = (edgeInfo) => {
    setState({
      ...state,
      clickedEdgeInfo: edgeInfo
    });
  }

  const setDisplayClickedNodeInfo = () => {
    // onToggle(); // TODO: note that this is the trigger used by Ahl -rui
    // call onToggleClickedNode to display the feedback when clicking a node -Rui
    onToggleClickedNode();
  };

  // The function triggers the display of edge info -Rui
  const setDisplayClickedEdgeInfo = () => {
    // call onToggleClickedEdge to dispaly the feedback when clicking an edge -Rui
    onToggleClickedEdge();
  }

  useEffect(() => {
    void getTemplates();
  }, []);

  return (
    <Layout>
      <HeaderNetworks />
      <Container
        maxW="full"
        m="0"
        pt="2"
        as="header"
        align="center"
        justify="center"
        wrap="wrap"
        bgColor="gray.100"
        borderColor="gray.600"
        borderBottom="solid 2px"
      >
        <Stack spacing={2} direction="row">
          <Text fontSize="sm" mr="5" pr="5" borderRight="solid 1px">
            Build your network
          </Text>

          <CheckboxGroup
            colorScheme="teal"
            defaultValue={state.selectedClasses}
            onChange={(e) =>
              setState({
                ...state,
                selectedClasses: e,
              })
            }
          >
            <Wrap spacing={0}>
              {state.resourceTemplates &&
                state.resourceTemplates.map((template) => (
                  <WrapItem key={template.id} pr="7">
                    <Checkbox size="md" value={template.id}>
                      {template.label}
                    </Checkbox>
                  </WrapItem>
                ))}
            </Wrap>
          </CheckboxGroup>
        </Stack>
      </Container>

      {state.resourceTemplates && (
        <Box position="relative">
          <SigmaWithNoSSR
            classes={state.selectedClasses}
            getClickedNodeDataInfo={getClickedNodeDataInfo}
            setDisplayClickedNodeInfo={setDisplayClickedNodeInfo}
            // add two functions below to disply edge info -Rui
            getClickedEdgeInfo={getClickedEdgeInfo}
            setDisplayClickedEdgeInfo={setDisplayClickedEdgeInfo}
          /* graph={graph} */
          />
        </Box>
      )}

      {// display clicked edge info -Rui
        state.clickedEdgeInfo && (
          <SlideFade in={isOpenClickedEdge} offsetY="20px" offsetX="20px">
            <Box
              p="10px" // padding
              maxW={{ base: '170px', sm: '160px' }} // max width
              maxH={{ base: '120px', sm: '120px' }} // max height
              mt="4" // margin top
              bg="gray.100"
              rounded="md"
              boxShadow="outline"
              boxSize="sm"
              borderColor="gray.800"
              borderRadius="md"
              pos="absolute"  // position
              // top={state.clickedEdgeInfo.coordinateY}
              // left={state.clickedEdgeInfo.coordinateX}
              top={{ base: '650', sm: '300', md: '250' }}
              left="90"
            >
              <Heading as="h5" size={['xs', 'sm']} mr="4">
                {state.clickedEdgeInfo.label}
              </Heading>
              <CloseButton onClick={onCloseClickedEdge} size="sm" pos="absolute" top="8px" right="8px" />
              <Divider orientation="horizontal" mt="2" mb="2" />
              <Text fontSize="sm">
                From: {state.clickedEdgeInfo.source}<br />
                To: {state.clickedEdgeInfo.target}
              </Text>
            </Box>
          </SlideFade>
        )}

      {// display clicked node info and data -Rui
        state.nodeData && state.clickedNodeInfo && (
          <SlideFade in={isOpenClickedNode} offsetY="20px" offsetX="20px">
            <Box
              maxW={{ base: '160px', sm: '160px', md: '200px' }} // max width
              maxH={{ base: '180px', sm: '180px', md: '150px' }} // max height
              p="10px" // padding
              mt="4" // margin top
              bg="gray.100"
              rounded="md"
              boxShadow="outline"
              boxSize="sm"
              borderColor="gray.800"
              borderRadius="md"
              pos="absolute"  // position
              // top={state.clickedNodeInfo.coordinateY}
              // left={state.clickedNodeInfo.coordinateX}
              top={{ base: '650', sm: '300', md: '250' }}
              left="100"
            >
              <Heading as="h5" size={['xs', 'sm']} mr="3">
                {state.clickedNodeInfo.label}
              </Heading>
              <CloseButton onClick={onCloseClickedNode} size="sm" pos="absolute" top="8px" right="8px" />
              <Divider orientation="horizontal" mt="2" mb="2" />
              <Button onClick={onToggle} colorScheme="blue" size="md" variant="link">View Full Data</Button>
              <Modal
                onClose={onClose}
                isOpen={isOpen}
                trapFocus={false}
                onOverlayClick={onClose}
                size="sm"
                isCentered
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>
                    {getDisplayType(state.nodeData['@type'][1])}
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <List>
                      {nodes.length &&
                        nodes.map((element, index) => (
                          <DataDrawerDisplayProperty
                            key={index}
                            propKey={element.property_label}
                            value={element.display_title || element['@value']}
                          />
                        ))}
                      <DataDrawerDisplayProperty
                        propKey="Link to Record"
                        value={
                          <a
                            href={linkToResource}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="blue"
                          >
                            <Text color="blue">
                              See full resource page
                            </Text>
                          </a>
                        }
                      />
                    </List>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Box>
          </SlideFade>
        )}

      {// TODO: commented code implemented by Ahl below -Rui
      /* {state.nodeData && (
        <Drawer
          placement="right"
          onClose={onClose}
          isOpen={isOpen}
          trapFocus={false}
          onOverlayClick={onClose}
          onEsc={onClose}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerHeader>
                {getDisplayType(state.nodeData['@type'][1])}
              </DrawerHeader>
              <DrawerBody>
                <List>
                  {nodes.length &&
                    nodes.map((element, index) => (
                      <DataDrawerDisplayProperty
                        key={index}
                        propKey={element['property_label']}
                        value={element['display_title'] || element['@value']}
                      />
                    ))}
                  <DataDrawerDisplayProperty
                    propKey="Link to Record"
                    value={
                      <a
                        href={linkToResource}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        See full resource page
                      </a>
                    }
                  />
                </List>
              </DrawerBody>
              <DrawerFooter>
                <Button onClick={onToggle}>Close</Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )} */}

    </Layout>
  );
};

export default Networks;