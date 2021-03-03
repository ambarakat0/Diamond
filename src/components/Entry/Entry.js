import React from 'react'
import Logo from '../../assets/images/diamond-logo.png'
import Button from '../UI/Button/Button'
import ButtonOutline from '../UI/ButtonOutline/ButtonOutline'
import classes from './Entry.css'

const entry = props => {


    const onclickHandlerLogin = () => {
       props.history.push('/Login')
    }
    const onclickHandlerSignUp = () => {
       props.history.push('/Signup')
    }

    return(
        <div className={classes.Container}>
            <div className={classes.Content}>
                <div className={classes.ImgContainer}>
                    <img className={classes.Img} src={Logo} alt="logo"/>
                </div>
                <div className={classes.TextContainer}>
                    <h1 className={classes.TextPrimary}>Expand your circle</h1>
                    <h2 className={classes.TextSecondary}>Join Diamond today.</h2>
                </div>
                <div className={classes.ButtonContainer}>
                    <Button clicked= {onclickHandlerSignUp}>Sign up</Button>
                    <ButtonOutline clicked= {onclickHandlerLogin}>Log in</ButtonOutline>
                </div>
            </div>
        </div>
    );
}

export default entry