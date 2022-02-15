import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import {Button, CircularProgress} from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const MediaPlayer = ({url}) => {
    const [type, setType] = useState('loading')

    useEffect(() => {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.onreadystatechange = function() {
            // Wait for header to become available.
            const contentType = xmlhttp.getResponseHeader('Content-Type');
            if (contentType) {
                // Stop downloading, the headers are all we need.
                xmlhttp.abort();
                setType(contentType.split('/')[0])
            }
        };
        xmlhttp.send();
    }, []);

    const Player = () => {
        switch (type) {
            case 'loading':
                return <CircularProgress />
            case 'video':
                return <ReactPlayer url={url} controls />
            case 'image':
                return <img src={url} alt="image" />
            default:
                return <Button href={url} target="_blank" startIcon={<CloudDownloadIcon />}>Salva il file</Button>
        }
    }


    return (
        <div style={{margin: '20px auto'}}>
            <Player />
        </div>
    )
}

export default MediaPlayer