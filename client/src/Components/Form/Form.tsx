import React from 'react';
import { Box, Flex, Button, Select } from '@chakra-ui/core';
import { Center } from '@chakra-ui/react';

import DropDownOption from '../DropDown/DropDown';
import ResultIcons from '../ResultIcons/ResultIcons';



const formStyle = {
/*   marginTop: '10rem',
  marginLeft: '40vw' */
};

const buttonStyle = {
  marginTop: '1rem'
};

const selectValues: string[] = [];

export default function SimpleSelect(props: any) {

    const handleChange = (event: React.ChangeEvent<{ value: any }>, props: any) => {
      selectValues.push(event.target.value);
      props.updateDropDownData(event.target.value);
    };

    const handleOnClick = async(props: any) => {
      await props.handleFormData(selectValues);
    };

    return (
      <div>
        {!props.displayGraph ?
      <Center>
        <Flex borderWidth="1px" borderRadius="lg" h='15em' w={1/4} align='center' justifyContent='center'>
          <Box h='auto' w='auto' p={4}>
            <form style={formStyle}>
                <Select
                  variant='flushed'
                  placeholder='Choose a class'
                  onChange={(e) => handleChange(e, props)}>
                  {props.dropDownData.map((dropDownOption: any, index: number) => {
                    if (props.dropDownData.length) {
                      return <DropDownOption dropDownData={dropDownOption} key={index}/>;
                    }
                    return null;
                  })}
                </Select>
            </form>
            <Box>
              {selectValues.map((value: string, index: number) => {
                return <ResultIcons key={index} selected={value}/>;
              })}
            </Box>
            {selectValues.length ?
            <Center>
              <Button style={buttonStyle} variantColor='green' onClick={() => handleOnClick(props)}>
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