import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayerUi from "../videoPlayer/VideoPlayerUi";
import {Link} from "react-router-dom";

class MovieCardSmallUi extends React.Component {

    render() {
        const {movie} = this.props;

        return (
            <article className="small-movie-card catalog__movies-card">
                <div className="small-movie-card__image">
                    <img src={`${movie.preview_image}`} alt={movie.name} width="280" height="175"/>
                </div>
                <h3 className="small-movie-card__title">
                    <Link to={`/films/${movie.id}`} className="small-movie-card__link">
                        {movie.name}
                    </Link>
                </h3>
            </article>
        )
    }
}

MovieCardSmallUi.propTypes = {
    movie: PropTypes.object,
    mouseEnterHandler: PropTypes.func
};

export default MovieCardSmallUi;
