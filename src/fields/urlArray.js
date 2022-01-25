import * as React from "react";
import { useRecordContext } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import LaunchIcon from '@material-ui/icons/Launch';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    link: {
        textDecoration: 'none',
    },
    icon: {
        width: '0.5em',
        height: '0.5em',
        paddingLeft: 2,
    },
});

const UrlArrayField = ({ source }) => {
    const record = useRecordContext();
    const classes = useStyles();
    return record[source] ? (
        <div className={classes.wrapper}>
            {record[source].map((data, index) => (
                <a key={data.key} href={data.url} target="_blank" rel="noreferrer" className={classes.link}>
                    {source}#{index}
                    <LaunchIcon className={classes.icon} />
                </a>
            ))}
        </div>
    ) : null;
}

export default UrlArrayField;