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

    return (
      <div>
        {!props.displayGraph ?
        <FormControl variant='outlined' style={formStyle} onSubmit={() => handleSubmit()}>
          <InputLabel id=''>Choose a field</InputLabel>
          <Select
            onChange={(event) => handleChange(event, props)}
            label='Choose a field'
          >
            <MenuItem value='Syon'>Syon</MenuItem>
          </Select>
        <Button style={buttonStyle} variant='contained' color='primary' onClick={() => handleOnClick(props)}>
            Create graph
        </Button>
        </FormControl>
        : null}
      </div>
    );
  }