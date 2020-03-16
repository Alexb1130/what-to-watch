import React from 'react';

class VideoPlayerUi extends React.Component {
    render() {
        const { film } = this.props;
        return(
            <video className="small-movie-card__video-preview" autoPlay src={film.preview_video_link} poster={`${film.preview_image}`} loop muted={true}></video>
        )
    }
}

export default VideoPlayerUi;
