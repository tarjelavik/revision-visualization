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
        <Flex bg='gray.50' color='gray.400' w={1/4} align='center' justifyContent='center'>
          <Box boxShadow='dark-lg' w='auto' p={4} >
            <form style={formStyle}>
                <Select
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
            <Flex>
              {selectValues.map((value: string, index: number) => {
                return <ResultIcons key={index} selected={value}/>;
              })}
            </Flex>
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