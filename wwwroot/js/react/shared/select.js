import React, { useState } from 'react';

export default function Select(props) {
    let [selectedValue, setSelectedValue] = useState(props.value);

    const options = props.items && props.items.length > 0 
        ? (props.items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>))
        : null;
        
    const _onChange = (event) => {
        setSelectedValue(event.target.value);
        props.onChange(event.target.value);
    }

    return  <select onChange={(event)=>(_onChange(event))} 
                    value={selectedValue} 
                    disabled={props.disabled}>
                <option value={undefined}>{props.defaultOption ?? 'Select option'}</option>
                {options}
            </select>;
}