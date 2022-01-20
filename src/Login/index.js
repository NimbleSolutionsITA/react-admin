import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core';
import defaultTheme from 'ra-ui-materialui/lib/defaultTheme';
import Notification from 'ra-ui-materialui/lib/layout/Notification';
import { useDispatch } from 'react-redux'
import { userLogin } from 'ra-core';

import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';

import { login, changePassword } from '../authProvider';

import ChangePasswordForm from './changePassword';
import DefaultLoginForm from './loginForm';
import isNewPasswordRequired from './isNewPasswordRequired';
import pageStyles from './pageStyles';
import sanitizeRestProps from './sanitizeRestProps';
import {useTranslate} from "react-admin";

const useStyles = makeStyles(pageStyles)

const Login = ({className, ...rest}) => {

    const [cognitoUser, setCognitoUser] = useState(null)
    const [step, setStep] = useState('login')
    const translate = useTranslate();

    const dispatch = useDispatch()

    const classes = useStyles()

    const handleChangePassword = (auth) => {
        return changePassword({cognitoUser, password: auth.password}).then(result => dispatch(userLogin(result)));
    }

    const handleLogin = (auth) => {
        return login(auth)
            .then(cognitoUser => {
                console.log(cognitoUser)
                setCognitoUser(cognitoUser)
                if (isNewPasswordRequired(cognitoUser)) {
                    setStep('change_password')
                } else {
                    dispatch(userLogin(cognitoUser));
                }
            })
            .catch(error => dispatch(userLogin({ error })));
    }

    return (
        <div
            className={classnames(classes.main, className)}
            {...sanitizeRestProps(rest)}
        >
            <Card className={classes.card}>
                <div className={classes.avatar}>
                    <Avatar className={classes.icon}>
                        <LockIcon />
                    </Avatar>
                </div>
                {step === 'login' ? (
                    <DefaultLoginForm login={handleLogin} translate={translate}/>
                ) : step === 'change_password' ? (
                    <ChangePasswordForm changePassword={handleChangePassword} translate={translate} />
                ) : null}
            </Card>
            <Notification />
        </div>
    )
}

Login.defaultProps = {
  theme: defaultTheme,
};

export default Login;
