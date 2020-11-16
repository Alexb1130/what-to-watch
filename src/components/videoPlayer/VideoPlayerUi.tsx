import React, {useState, useEffect, useRef} from 'react';
import {Movie} from "@/types";

const MINUTES_IN_HOUR: number = 60;
const SECONDS_IN_MINUTE: number = 60;

const getStringTime = (secValue: number = 0): string => {
    let hours: string | number = Math.floor(secValue / SECONDS_IN_MINUTE / MINUTES_IN_HOUR);
    let minutes: string | number = Math.floor(secValue / SECONDS_IN_MINUTE % MINUTES_IN_HOUR);
    let seconds: string | number = Math.floor(secValue % SECONDS_IN_MINUTE);

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

interface Props {
    isStartPlaying: boolean,
    exitPlayer: () => void,
    film: Movie,
    onPlayBtnClick?: () => void,
}

const VideoPlayerUi = (props: Props) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(props.isStartPlaying || false)
    const [percentProgress, setPercentProgress] = useState<number>(0)
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const { onPlayBtnClick, film } = props;

    const videoRef = useRef(null);

    useEffect(() => {
        const video: any = videoRef.current;

        video.addEventListener(`play`, handlePlay);
        video.addEventListener(`pause`, handlePause);
        video.addEventListener(`timeupdate`, handleTimeUpdate);
        video.addEventListener(`fullscreenchange`, handleFullScreen);

        if (props.isStartPlaying) {
            video.play();
        }

        return () => {
            video.removeEventListener(`play`, handlePlay);
            video.removeEventListener(`pause`, handlePause);
            video.removeEventListener(`timeupdate`, handleTimeUpdate);
            video.removeEventListener(`fullscreenchange`, handleFullScreen);
        }
    }, [videoRef])

    function exitPlayer() {
        props.exitPlayer();
    };

    function handlePlay() {
        setIsPlaying(true);
    }

    function handlePause() {
        setIsPlaying(false);
    }

    function handlePlayBtnClick() {
        if (document.fullscreenElement) {
            return;
        }

        toggleVideoState();

        setIsPlaying((prevState) => !prevState);
    }

    function handleTimeUpdate() {
        updateTimeElapsed();
    }

    function handleFullScreen() {
        const video: any = videoRef.current;

        video.controls = !!document.fullscreenElement;
    }

    function updateTimeElapsed() {
        const currentVideo: any = videoRef.current;

        const duration = currentVideo.duration;
        const currentTimeValue = currentVideo.currentTime;
        const percentProgress = +(currentTimeValue * 100 / duration).toFixed(2);

        setTimeElapsed(Math.floor(duration - currentTimeValue))
        setPercentProgress(percentProgress)
    }

    function setFullScreen() {
        const video: any = videoRef.current;

        video.requestFullscreen();
    }

    function toggleVideoState() {
        const video: any = videoRef.current;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
    }

    function getVideoStyles(): React.CSSProperties {
        return {
            width: `100%`,
            height: `100%`,
            objectFit: `cover`,
        };
    }

    return (

        <div className="player" style={{zIndex: 1000}}>
            <div className="player__video-wrap" onClick={onPlayBtnClick}>
                <video
                    className="small-movie-card__video-preview"
                    autoPlay
                    playsInline
                    src={film.preview_video_link}
                    poster={`${film.preview_image}`}
                    style={getVideoStyles()}
                    ref={videoRef as React.RefObject<HTMLVideoElement>}
                    loop
                    muted={true}>
                </video>
            </div>

            <button type="button" className="player__exit" style={{zIndex: 2000}} onClick={exitPlayer}>Exit</button>

            <div className="player__controls" style={{zIndex: 2000}}>
                <div className="player__controls-row">
                    <div className="player__time">
                        <progress className="player__progress" value={percentProgress} max="100"/>
                        <div className="player__toggler" style={{left: `${percentProgress}%`}}>Toggler</div>
                    </div>
                    <div className="player__time-value">{getStringTime(timeElapsed)}</div>
                </div>

                <div className="player__controls-row">
                    <button type="button" className="player__play" onClick={handlePlayBtnClick}>
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

                    <button type="button" className="player__full-screen" onClick={setFullScreen}>
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

export default VideoPlayerUi;
