import React from 'react';
import classes from './Select.css'

const select = props => {
    const options = props.options.map(opt => (
        <option className={classes.Option} value={opt.value} key={opt.value}>{ opt.displayValue}</option>
    ))
    return(
        <select className={classes.Select}>
            {options}
        </select>
    );
}

export default select