import React from 'react';
import Button from '@material-ui/core/Button';

import DropDownOption from '../DropDown/DropDown';


const formStyle = {
  marginTop: '10rem',
  marginLeft: '40vw'
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
    }

    return (
      <div>
        {!props.displayGraph ?
        <form style={formStyle}>
            <select
              onChange={(e) => handleChange(e, props)}
              value={ props.formValue || '' }>

              {props.dropDownData.map((dropDownOption: any, index: number) => {
                if (props.dropDownData.length) {
                  return <DropDownOption dropDownData={dropDownOption} key={index}/>
                }
                return null;
              })}
            </select>
          <Button style={buttonStyle} variant='contained' color='primary' onClick={() => {handleOnClick(props); handleSubmit()}}>
              Create graph
          </Button>
        </form>
        : null}
      </div>
    );
  }