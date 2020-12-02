import React from 'react';
import { Box, Flex, Button, Select, Center } from '@chakra-ui/react';

import DropDownOption from '../DropDown/DropDown';
import ResultTag from '../ResultTag/ResultTag';

const buttonStyle = {
  marginTop: '1rem'
};

export default function SimpleSelect(props: any) {

    const handleChange = (event: React.ChangeEvent<{ value: any }>, props: any) => {
      props.addSelectedClass(event.target.value);
      props.removeFromDropDownData(event.target.value);
    };

    const handleOnClick = async(props: any) => {
      await props.handleFormData(props.selectedClasses);
    };

    const updateSelectedValues = (value: any) => {
      props.removeSelectedClass(value);
      props.addToDropDownData(value);
    };

    return (
      <div>
        {!props.displayGraph && !props.isLoading ?
      <Center>
        <Flex mt='7rem' borderWidth="1px" borderRadius="lg" h='15em' w={1/4} align='center' justifyContent='center'>
          <Box h='auto' w='auto' p={4}>
            <form>
                <Select
                  variant='flushed'
                  placeholder='Choose a class'
                  value='Placeholder'
                  onChange={(e) => handleChange(e, props)}>
                  {props.dropDownData.map((dropDownOption: any, index: number) => {
                    if (props.dropDownData.length) {
                      return <DropDownOption onClick={() => handleOnClick(props)} dropDownData={dropDownOption} key={index}/>;
                    }
                    return null;
                  })}
                </Select>
            </form>
            <Flex flexWrap="wrap" w="12em">
              <Box>
                {props.selectedClasses.map((value: string, index: number) => {
                  return <ResultTag key={index} resultKey={index} updateSelectedValues={updateSelectedValues} selected={value}/>;
                })}
              </Box>
            </Flex>
            {props.selectedClasses.length  ?
            <Center>
              <Button style={buttonStyle} colorScheme='green' onClick={() => handleOnClick(props)}>
                  Create graph
              </Button>
            </Center>
            : null}
          </Box>
        </Flex>
      </Center>
        : null}
      </div>
    );
  }