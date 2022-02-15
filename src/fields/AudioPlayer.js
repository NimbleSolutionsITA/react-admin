import React, {useEffect, useState} from "react";
import {IconButton} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};

const AudioPlayer = ({src}) => {
    const [playing, toggle] = useAudio(src);
    return (
        <IconButton style={{margin: '0 0 20px 10px'}} onClick={toggle}>{playing ? <PauseIcon /> : <PlayArrowIcon />}</IconButton>
    )
}

export default AudioPlayer