import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Controller, useForm} from "react-hook-form";
import isLoadingFunc from "./isLoading";
import styles from './formStyles';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(styles)

export const ChangePasswordForm = ({
    changePassword,
    translate
}) => {
    const {handleSubmit, control} = useForm()
    const classes = useStyles()
    const isLoading = isLoadingFunc(window.location).isLoading
    return (
        <form onSubmit={handleSubmit(changePassword)}>
            <div className={classes.form}>
                <p>Please change your password to continue signing in.</p>
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
                    {'Change Password'}
                </Button>
            </CardActions>
        </form>
    )
}

export default ChangePasswordForm;
