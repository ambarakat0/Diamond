import React, { useState } from 'react' 
import Nav from '../../components/Nav/Nav'
import classes from './Tags.css';
import AddPost from '../AddPost/AddPost'
import Icon from '../../components/UI/Icon/Icon'
import IconWithToolTip from '../../components/UI/IconWithTooltip/IconWithTooltip'

const home = props => {
    const [show, setShow] = useState(false)

    const onShowAddpost = () => {
        setShow(prevState => !prevState)
    }
    let addPostSec = null;
    if (show) {
        addPostSec = (<AddPost/>)
    }

    return (
        <div className={classes.Container}>
            <Nav />
            <div className={classes.Main}>
                <div className={classes.TagContainer}>
                    <div className={classes.Tag}>
                        <Icon containerClass={classes.IcContainer} classes={classes.Icon} iconname="price-tag"/>
                        <h2 className={classes.Text}>Sport</h2>
                    </div>
                </div>
                <div className={classes.OpenAddPost}>
                    <IconWithToolTip text="Share your moment"  iconName= {show ? "circle-up" : "circle-down" }clicked={ onShowAddpost}/>
                </div>
                {addPostSec}
            </div>
        </div>
    );
}

export default home