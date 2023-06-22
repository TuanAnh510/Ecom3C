import React from 'react';
import YouTube from 'react-youtube';

const VideoBlog = (props) => {
    const opts = {
        
        height: '540',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <YouTube videoId={props.idyt} opts={opts} onReady={_onReady} />
    );

    function _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

}

export default VideoBlog;