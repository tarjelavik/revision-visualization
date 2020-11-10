import React from 'react';
import { Button } from '@chakra-ui/core';
import { Select } from '@chakra-ui/core';
import { Box, Flex } from '@chakra-ui/core';

import DropDownOption from '../DropDown/DropDown';


const formStyle = {
/*   marginTop: '10rem',
  marginLeft: '40vw' */
};

const buttonStyle = {
  marginTop: '1rem'
};


export default function SimpleSelect(props: any) {

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>, props: any) => {
      props.handleFormData(event.target.value)
    };

    const handleOnClick = (props: any) => {
      props.setDisplayGraph(true);
    };

    const handleSubmit = () => {
    };

    return (
      <div>
        {!props.displayGraph ?
        <Flex width='full' align='center' justifyContent='center'>
          <Box bg='tomato' w='20%' p={4} >
          <form style={formStyle}>
              <Select
                onChange={(e) => handleChange(e, props)}
                value={ props.formValue || '' }>

                {props.dropDownData.map((dropDownOption: any, index: number) => {
                  if (props.dropDownData.length) {
                    return <DropDownOption dropDownData={dropDownOption} key={index}/>
                  }
                  return null;
                })}
              </Select>
            <Button style={buttonStyle} variantColor='green' onClick={() => {handleOnClick(props); handleSubmit()}}>
                Create graph
            </Button>
          </form>
          <p>This is where we will display what the user have chosen</p>
          </Box>
        </Flex>
        : null}
      </div>
    );
  }