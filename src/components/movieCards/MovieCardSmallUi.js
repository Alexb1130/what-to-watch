import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayerUi from "../videoPlayer/VideoPlayerUi";
import {Link} from "react-router-dom";

import {CSSTransitionGroup} from 'react-transition-group';

class MovieCardSmallUi extends React.Component {

    state = {
        isPreview: false
    };

    _mouseEnterHandler() {
        this.setState({
            isPreview: true
        })
    }

    _mouseLeaveHandler() {
        this.setState({
            isPreview: false
        })
    }

    render() {
        const {movie, mouseEnterHandler, mouseLeaveHandler = () => null} = this.props;
        return (
            <article onMouseLeave={() => {
                mouseLeaveHandler();
                this._mouseLeaveHandler();
            }} onMouseEnter={() => {
                mouseEnterHandler();
                this._mouseEnterHandler();
            }}
                     className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                    <img src={`${movie.preview_image}`} alt={movie.name} width="280" height="175"/>
                </div>
                <h3 className="small-movie-card__title">
                    <Link to="/movie-page" className="small-movie-card__link">
                        {movie.name}
                    </Link>
                </h3>
                <CSSTransitionGroup transitionName="preview"
                                    transitionEnterTimeout={1000}
                                    transitionLeave={false}>

                    {
                        this.state.isPreview &&
                        <VideoPlayerUi film={movie}/>
                    }
                </CSSTransitionGroup>
            </article>
        )
    }
}

MovieCardSmallUi.propTypes = {
    movie: PropTypes.object,
    mouseEnterHandler: PropTypes.func
};

export default MovieCardSmallUi;
