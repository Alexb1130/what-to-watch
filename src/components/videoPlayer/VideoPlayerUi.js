import React from 'react';

class VideoPlayerUi extends React.Component {
    render() {
        const { film } = this.props;
        return(
            <video className="small-movie-card__video-preview" autoPlay src={film.preview} poster={`img/${film.poster}`} loop muted={true}></video>
        )
    }
}

export default VideoPlayerUi;
