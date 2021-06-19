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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  List,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import DataDrawerDisplayProperty from '../../components/DataDrawerDisplayProperty';
import { desiredProps, getDisplayType } from '../../lib/helpers';

const initialState = {
  resourceTemplates: [],
  selectedClasses: ['13', '16'],
  nodeData: null,
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
    return `https://birgitta.test.uib.no/s/birgitta/item/${nodeData['o:id']}`;
  } catch {
    return '';
  }
};

const SigmaWithNoSSR = dynamic(() => import('../../components/SigmaBox'), {
  ssr: false,
});

const Networks = () => {
  const [state, setState] = useState(initialState);
  const { isOpen, onClose, onToggle } = useDisclosure();

  const nodes = filterProps(state.nodeData);
  const linkToResource = getLinkToResource(state.nodeData);

  const getTemplates = async () => {
    const response = await fetch(`api/graph/templates`);
    const body = await response.json();
    setState({
      ...state,
      resourceTemplates: body,
    });
  };

  const getClickedNodeData = async (id) => {
    const response = await fetch(`api/graph/node/${id}`);
    try {
      const body = await response.json();
      console.log(body);
      setState({
        ...state,
        nodeData: body,
      });
    } catch (error) {
      // TODO: Handle this is a more elegant manner which lets end user know that something is wrong.
      console.log(error);
    }
  };

  const setDisplayDrawer = () => {
    onToggle();
  };

  useEffect(() => {
    void getTemplates();
  }, []);

  return (
    <Layout>
      <Container
        maxW="full"
        m="0"
        pt="4"
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
            getClickedNodeData={getClickedNodeData}
            setDisplayDrawer={setDisplayDrawer}
            /* graph={graph} */
          />
        </Box>
      )}

      {state.nodeData && (
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
      )}
    </Layout>
  );
};

export default Networks;
