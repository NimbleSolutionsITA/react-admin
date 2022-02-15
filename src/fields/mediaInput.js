import * as React from "react";
import { useField } from 'react-final-form';
import MediaPlayer from "./MediaPlayer";


const MediaInput = ({source}) => {
    const {input: {value}} = useField(source);
    return (
        <MediaPlayer url={value} />
    )
}

export default MediaInput
