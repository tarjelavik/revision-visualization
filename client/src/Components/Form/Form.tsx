import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


const formStyle = {
  marginTop: '10rem'
}

const buttonStyle = {
  marginTop: "1rem"
}


export default function SimpleSelect(props: any) {

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      console.log(event);
    };

    const handleOnClick = (props: any) => { 
      props.setDisplayGraph(true);
    };

    return (
      <div>
        {!props.displayGraph ? 
        <FormControl variant='outlined' style={formStyle}>
          <InputLabel id='demo-simple-select-outlined-label'>Age</InputLabel>
          <Select
            onChange={handleChange}
            label='Age'
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        <Button style={buttonStyle} variant='contained' color='primary' onClick={() => handleOnClick(props)}>
            Create graph
        </Button>
        </FormControl>
        : null}
      </div>
    );
  }