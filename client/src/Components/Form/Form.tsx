import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';


const formStyle = {
  marginTop: '10rem'
}

const buttonStyle = {
  marginTop: '1rem'
}


export default function SimpleSelect(props: any) {

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>, props: any) => {
      props.handleFormData(event.target.value)
    };

    const handleOnClick = (props: any) => {
      props.setDisplayGraph(true);
    };

    const handleSubmit = () => {
      console.log('submitted');
    }


    // TODOS: MenuItems are to be based on dropdowns populated with data from Omeka APIs. Create own components for it?

    return (
      <div>
        {!props.displayGraph ?
        <FormControl style={formStyle}>
            <InputLabel id=''>Choose a field</InputLabel>
            <Select
              variant='outlined'
              onChange={(e) => handleChange(e, props)}
              label='Choose a field'
              value={ props.formValue || '' }
            >
              <MenuItem value='Syon'>Syon</MenuItem>
            </Select>
          <Button style={buttonStyle} variant='contained' color='primary' onClick={() => {handleOnClick(props); handleSubmit()}}>
              Create graph
          </Button>
        </FormControl>
        : null}
      </div>
    );
  }