import React from 'react';

class TabDetails extends React.Component {

    render() {

        const { film } = this.props;

        return (
            <div className="movie-card__text movie-card__row">
                <div className="movie-card__text-col">
                    <p className="movie-card__details-item">
                        <strong className="movie-card__details-name">Director</strong>
                        <span className="movie-card__details-value">Wes Andreson</span>
                    </p>
                    <p className="movie-card__details-item">
                        <strong className="movie-card__details-name">Starring</strong>
                        <span className="movie-card__details-value">
                            {film.starring.join(', ')}
                        </span>
                    </p>
                </div>

                <div className="movie-card__text-col">
                    <p className="movie-card__details-item">
                        <strong className="movie-card__details-name">Run Time</strong>
                        <span className="movie-card__details-value">
                            {film.duration.hours}h
                            {' '}
                            {film.duration.minutes}m
                        </span>
                    </p>
                    <p className="movie-card__details-item">
                        <strong className="movie-card__details-name">Genre</strong>
                        <span className="movie-card__details-value">
                            {film.genre}
                        </span>
                    </p>
                    <p className="movie-card__details-item">
                        <strong className="movie-card__details-name">Released</strong>
                        <span className="movie-card__details-value">
                            {film.release.year}
                        </span>
                    </p>
                </div>
            </div>
        )
    }
}

export default TabDetails;
