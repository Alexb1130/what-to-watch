import React, {CSSProperties, useState} from 'react';
import VideoPlayerUi from "@/components/videoPlayer/VideoPlayerUi";
import Logo from "@/components/logo/Logo";
import UserBlock from "@/components/userBlock/UserBlockUi";
import {Link} from "react-router-dom";
import TabsTemplate from "@/components/tabs/TabsTemplate";
import {Movie} from '@/types'
import {observer} from "mobx-react";

interface Props {
    film: Movie
    favoriteHandler: (id: string | number) => void
    isFull?: boolean
    isAuthorizationRequired?: boolean
}

const loadingStyles: CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0,0,0,.9)',
    color: '#c9b37e',
    zIndex: 1000
}

const MovieCardBigUi = observer((props: Props) => {
    const [isStartVideoPlaying, setIsStartVideoPlaying] = useState<boolean>(false)

    const playHandle = () => {
        setIsStartVideoPlaying(true)
    }

    const exitPlayer = () => {
        setIsStartVideoPlaying(false)
    }

    const {film, isFull, isAuthorizationRequired, favoriteHandler} = props;

    if (!film) {
        return <div style={loadingStyles}>
            <h1>Loading...</h1>
        </div>
    }

    return (
        <>
            {
                isStartVideoPlaying &&
                <VideoPlayerUi
                    exitPlayer={exitPlayer}
                    isStartPlaying={isStartVideoPlaying}
                    film={film}
                />
            }
            <section className={`movie-card ${isFull ? 'movie-card--full' : null}`}
                     style={{backgroundColor: film.background_color}}>
                <div className={`${isFull ? 'movie-card__hero' : null}`}>
                    <div className="movie-card__bg" style={{backgroundColor: film.background_color}}>
                        <img src={film.background_image} alt={name}/>
                    </div>

                    <h1 className="visually-hidden">WTW</h1>

                    <header className="page-header movie-card__head">
                        <Logo/>
                        <UserBlock/>
                    </header>

                    <div className="movie-card__wrap">
                        <div className="movie-card__info">
                            {
                                !isFull && <div className="movie-card__poster">
                                    <img src={film.poster_image} alt={film.name}/>
                                </div>
                            }

                            <div className="movie-card__desc">
                                <h2 className="movie-card__title">{film.name}</h2>
                                <p className="movie-card__meta">
                                    <span className="movie-card__genre">{film.genre}</span>
                                    <span className="movie-card__year">{film.released}</span>
                                </p>

                                <div className="movie-card__buttons">
                                    <button onClick={playHandle} className="btn btn--play movie-card__button">
                                        <svg viewBox="0 0 19 19" width="19" height="19">
                                            <use xlinkHref="#play-s"/>
                                        </svg>
                                        <span>Play</span>
                                    </button>
                                    <button onClick={() => favoriteHandler(film.id)}
                                            className="btn btn--play movie-card__button">
                                        <svg viewBox="0 0 19 19" width="19" height="19">
                                            <use xlinkHref={film.is_favorite ? "#in-list" : "#add"}/>
                                        </svg>
                                        <span>My list</span>
                                    </button>
                                    {
                                        isFull && !isAuthorizationRequired &&
                                        <Link to={`${film.id}/review/`} className="btn movie-card__button">
                                            Add review
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    isFull &&
                    <div className="movie-card__wrap movie-card__translate-top">
                        <div className="movie-card__info">
                            <div className="movie-card__poster movie-card__poster--big">
                                <img src={film.poster_image} alt={film.name}
                                     width="218" height="327"/>
                            </div>
                            <TabsTemplate film={film}/>
                        </div>
                    </div>
                }
            </section>
        </>
    )
})

export default MovieCardBigUi;
