import React from 'react';
import {Movie} from "@/types";

const runtimeConvert = (runtime: number) => {
    const hours = (runtime / 60);
    const resultHours = Math.floor(hours);
    const minutes = (hours - resultHours) * 60;
    const resultMinutes = Math.round(minutes);

    return {
        hours: resultHours,
        minutes: resultMinutes,
        defaultValue: runtime
    };
};

interface Props {
    film: Movie
}

const TabDetails = (props: Props) => {

    const {film} = props;

    const runtime = runtimeConvert(film.run_time);

    return (
        <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Director</strong>
                    <span className="movie-card__details-value">{film.director}</span>
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
                            {runtime.hours}h
                        {' '}
                        {runtime.minutes}m
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
                            {film.released}
                        </span>
                </p>
            </div>
        </div>
    )
}

export default TabDetails;
