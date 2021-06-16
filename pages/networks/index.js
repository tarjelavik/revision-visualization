import { Flex, HStack } from '@chakra-ui/layout'
import { Button, Checkbox, CheckboxGroup, useCheckboxGroup } from "@chakra-ui/react"
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useLayoutEffect, useState } from 'react'
import Layout from '../../components/Layout'

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
  displayDrawer: false,
}

const SigmaWithNoSSR = dynamic(() => import('../../components/SigmaBox'), {ssr: false})

export default function Networks() {
  const [state, setState] = useState(initialState)

  const getTemplates = async () => {
    const response = await fetch(`api/graph/templates`);
    const body = await response.json();
    setState({
      ...state,
      resourceTemplates: body
    })
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
        bgColor="green.200"
      >
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

      <SigmaWithNoSSR classes={state.selectedClasses} />
      {/* <pre>
        {JSON.stringify(state, null, 2)}
      </pre> */}
    </Layout>
  )
}
