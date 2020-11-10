import React from 'react';

const DropDownOption = (props: any) => {
    return (
            <option value={props.dropDownData.id}>{props.dropDownData.label}</option>
    );
};
export default DropDownOption;