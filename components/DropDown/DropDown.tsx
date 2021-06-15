import React from 'react';

const DropDownOption = (props: any) => {
    return (
            <option value={props.dropDownData.id.toString()}>{props.dropDownData.label}</option>
    );
};
export default DropDownOption;