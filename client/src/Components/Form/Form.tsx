import React from 'react';
import { Button } from '@chakra-ui/core';
import { Select } from '@chakra-ui/core';
import { Box, Flex } from '@chakra-ui/core';

import DropDownOption from '../DropDown/DropDown';
import ResultIcons from '../ResultIcons/ResultIcons';



const formStyle = {
/*   marginTop: '10rem',
  marginLeft: '40vw' */
};

const buttonStyle = {
  marginTop: '1rem'
};

let selectValues: string[] = [];

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
        <Flex width='full' align='center' justifyContent='center'>
          <Box bg='tomato' w='20%' p={4} >
          <form style={formStyle}>
              <Select
                onChange={(e) => handleChange(e, props)}
                value={ 'Choose something' }>
                <option value='Choose something'>Choose something</option>
                {props.dropDownData.map((dropDownOption: any, index: number) => {
                  if (props.dropDownData.length) {
                    return <DropDownOption dropDownData={dropDownOption} key={index}/>;
                  }
                  return null;
                })}
              </Select>
              {selectValues.length ?
            <Button style={buttonStyle} variantColor='green' onClick={() => handleOnClick(props)}>
                Create graph
            </Button>
           : null}
          </form>
          {selectValues.map((value: string, index: number) => {
            return <ResultIcons key={index} selected={value}/>;
          })}
          </Box>
        </Flex>
        : null}
      </div>
    );
  }