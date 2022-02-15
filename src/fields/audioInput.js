import * as React from "react";
import {Box} from "@material-ui/core";
import {TextInput} from "react-admin";
import { useField } from 'react-final-form';
import AudioPlayer from "./AudioPlayer";

const AudioInput = ({source}) => {
    const {input: {value: {key, url}}} = useField(source);
    return (
        <Box display="flex" alignItems="center" >
            <TextInput fullWidth source={source+'.key'} />
            <AudioPlayer src={url} />
        </Box>
    )
}

export default AudioInput