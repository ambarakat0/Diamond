import React from 'react';
import {NavLink} from 'react-router-dom'
import Icon from '../../UI/Icon/Icon'
import classes from './NavItem.css'

import {withRouter } from 'react-router-dom'

const navitem = props => {

    const onClickRedirect = () => {
        props.history.push(props.link)
    }

    let classesArr = [classes.NavItem]

    if (props.link === props.location.pathname) {
        classesArr.push(classes.active)
    }

    return (
        <li className={classesArr.join(' ')} onClick={(onClickRedirect)}>
            <Icon iconname={props.iconName}/>
            <NavLink to={props.link} className={classes.NavLink} activeClassName={classes.active}>{props.children}</NavLink>
        </li>
    );
}

export default withRouter(navitem)