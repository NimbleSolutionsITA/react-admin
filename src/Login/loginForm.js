import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import styles from './formStyles';
import isLoadingFunc from './isLoading';
import {useForm, Controller} from "react-hook-form";

const useStyles = makeStyles(styles)

export const LoginForm = ({
  login,
  translate
}) => {
    const {handleSubmit, control} = useForm()
    const classes = useStyles()
    const isLoading = isLoadingFunc(window.location).isLoading

    return (
        <form onSubmit={handleSubmit(login, console.error)}>
            <div className={classes.form}>
                <div className={classes.input}>
                    <Controller
                        control={control}
                        name="username"
                        defaultValue=""
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <TextField
                                label={translate('ra.auth.username')}
                                disabled={isLoading}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                inputRef={ref}
                                fullWidth
                            />
                        )}
                    />
                </div>
                <div className={classes.input}>
                    <Controller
                        control={control}
                        defaultValue=""
                        name="password"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <TextField
                                label={translate('ra.auth.password')}
                                type="password"
                                disabled={isLoading}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                inputRef={ref}
                                fullWidth
                            />
                        )}
                    />
                </div>
            </div>
            <CardActions>
                <Button
                    variant="raised"
                    type="submit"
                    color="primary"
                    disabled={isLoading}
                    className={classes.button}
                >
                    {isLoading && <CircularProgress size={25} thickness={2} />}
                    {translate('ra.auth.sign_in')}
                </Button>
            </CardActions>
        </form>
    )
}

export default LoginForm


