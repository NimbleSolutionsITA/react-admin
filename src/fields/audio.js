import * as React from "react";
import AudioPlayer from "./AudioPlayer";
import {useRecordContext} from "react-admin";

const AudioField = ({source}) => {
    const record = useRecordContext();
    return record[source] ? (
        <AudioPlayer src={record[source].url} />
    ) : null
}

export default AudioField