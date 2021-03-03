import React from 'react';
import Icon from '../Icon/Icon'
import classes from './Spinner.css'

const spinner = props => {
    return (
        <div style={{display: 'inline-block', margin: '0 auto'}}>
            <Icon iconname="spinner" classes={classes.Ic} containerClass={classes.Added }/>
        </div>
    );
}

export default spinner