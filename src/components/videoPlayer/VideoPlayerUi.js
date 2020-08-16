import React from 'react';

const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;

const getStringTime = (secValue = 0) => {
    let hours = Math.floor(secValue / SECONDS_IN_MINUTE / MINUTES_IN_HOUR);
    let minutes = Math.floor(secValue / SECONDS_IN_MINUTE % MINUTES_IN_HOUR);
    let seconds = Math.floor(secValue % SECONDS_IN_MINUTE);

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
};

class VideoPlayerUi extends React.Component {

    _videoRef = React.createRef();

    state = {
        isPlaying: this.props.isStartPlaying || false,
        percentProgress: 0,
        timeElapsed: 0,
    };


    componentDidMount() {
        const video = this._videoRef.current;

        video.addEventListener(`play`, this._handlePlay);
        video.addEventListener(`pause`, this._handlePause);
        video.addEventListener(`timeupdate`, this._handleTimeUpdate);
        video.addEventListener(`fullscreenchange`, this._handleFullScreen);

        if (this.props.isStartPlaying) {
            video.play();
            return;
        }
    }

    componentWillUnmount() {
        const video = this._videoRef.current;

        video.removeEventListener(`play`, this._handlePlay);
        video.removeEventListener(`pause`, this._handlePause);
        video.removeEventListener(`timeupdate`, this._handleTimeUpdate);
        video.removeEventListener(`fullscreenchange`, this._handleFullScreen);
    }

    _exitPlayer = () => {
        this.props.exitPlayer();
    };

    _handlePlay = () => {
        this.setState({isPlaying: true});
    }

    _handlePause = () => {
        this.setState({isPlaying: false});
    }

    _handlePlayBtnClick = () => {
        if (document.fullscreenElement) {
            return;
        }

        this._toggleVideoState();

        this.setState((prevState) => ({
            isPlaying: !prevState.isPlaying,
        }));
    }

    _handleTimeUpdate = () => {
        this._setTimeElapsed();
    }

    _handleFullScreen() {
        const video = this._videoRef.current;

        video.controls = !!document.fullscreenElement;
    }

    _setTimeElapsed = () => {
        const currentVideo = this._videoRef.current;

        const duration = currentVideo.duration;
        const currentTimeValue = currentVideo.currentTime;
        const percentProgress = +(currentTimeValue * 100 / duration).toFixed(2);

        this.setState({
            timeElapsed: Math.floor(duration - currentTimeValue),
            percentProgress,
        });
    }

    _setFullScreen = () => {
        const video = this._videoRef.current;

        video.requestFullscreen();
    }

    _toggleVideoState = () => {
        const video = this._videoRef.current;
        const {isPlaying} = this.state;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
    }

    _getVideoStyles() {
        return {
            width: `100%`,
            height: `100%`,
            objectFit: `cover`,
        };
    }

    render() {

        const { onPlayBtnClick, film } = this.props;

        const { isPlaying, timeElapsed, percentProgress} = this.state;

        return (

            <div className="player" style={{zIndex: 1000}}>
                <div className="player__video-wrap" onClick={onPlayBtnClick}>
                    <video
                        className="small-movie-card__video-preview"
                        autoPlay
                        playsInline
                        src={film.preview_video_link}
                        poster={`${film.preview_image}`}
                        style={this._getVideoStyles()}
                        ref={this._videoRef}
                        loop
                        muted={true}>
                    </video>
                </div>

                <button type="button" className="player__exit" style={{zIndex: 2000}} onClick={this._exitPlayer}>Exit</button>

                <div className="player__controls" style={{zIndex: 2000}}>
                    <div className="player__controls-row">
                        <div className="player__time">
                            <progress className="player__progress" value={percentProgress} max="100"/>
                            <div className="player__toggler" style={{left: `${percentProgress}%`}}>Toggler</div>
                        </div>
                        <div className="player__time-value">{getStringTime(timeElapsed)}</div>
                    </div>

                    <div className="player__controls-row">
                        <button type="button" className="player__play" onClick={this._handlePlayBtnClick}>
                            {isPlaying
                                ? <>
                                    <svg viewBox="0 0 14 21" width="14" height="21">
                                        <use xlinkHref="#pause"/>
                                    </svg>
                                    <span>Pause</span>
                                </>
                                : <>
                                    <svg viewBox="0 0 19 19" width="19" height="19">
                                        <use xlinkHref="#play-s"/>
                                    </svg>
                                    <span>Play</span>
                                </>
                            }
                        </button>

                        <div className="player__name">{film.name}</div>

                        <button type="button" className="player__full-screen" onClick={this._setFullScreen}>
                            <svg viewBox="0 0 27 27" width="27" height="27">
                                <use xlinkHref="#full-screen"/>
                            </svg>
                            <span>Full screen</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default VideoPlayerUi;
