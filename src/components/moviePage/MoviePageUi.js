import React from 'react';
import Logo from '../logo/Logo';
import TabsTemplate from "../tabs/TabsTemplate";
import CatalogUi from '../catalog/CatalogUi';
import { observer } from "mobx-react";
import filmsStore from "../../store/filmsStore";
import {withRouter} from 'react-router-dom';
import {Link} from "react-router-dom";

@withRouter
@observer
class MoviePageUi extends React.Component {

    render() {

        const {films, getCurrentFilm} = filmsStore;
        const {match} = this.props;
        const currentFilm = getCurrentFilm(films, match.params.id);

        const similarFilms = films.filter(film => film.genre === currentFilm.genre);

        if(!currentFilm) {
            return <h1>Loading...</h1>
        }

        return (
            <>
                <section className="movie-card movie-card--full" style={{backgroundColor: currentFilm.background_color}}>
                    <div className="movie-card__hero">
                        <div className="movie-card__bg">
                            <img src={`${currentFilm.background_image}`} alt={`${currentFilm.name}`}/>
                        </div>

                        <h1 className="visually-hidden">WTW</h1>

                        <header className="page-header movie-card__head">

                            <Logo/>

                            <div className="user-block">
                                <div className="user-block__avatar">
                                    <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                                </div>
                            </div>
                        </header>

                        <div className="movie-card__wrap">
                            <div className="movie-card__desc">
                                <h2 className="movie-card__title">
                                    {currentFilm.name}
                                </h2>
                                <p className="movie-card__meta">
                                    <span className="movie-card__genre">{currentFilm.genre}</span>
                                    <span className="movie-card__year">{currentFilm.released}</span>
                                </p>

                                <div className="movie-card__buttons">
                                    <button className="btn btn--play movie-card__button" type="button">
                                        <svg viewBox="0 0 19 19" width="19" height="19">
                                            <use xlinkHref="#play-s"></use>
                                        </svg>
                                        <span>Play</span>
                                    </button>
                                    <button className="btn btn--list movie-card__button" type="button">
                                        <svg viewBox="0 0 19 20" width="19" height="20">
                                            <use xlinkHref="#add"></use>
                                        </svg>
                                        <span>My list</span>
                                    </button>
                                    <Link to={`${currentFilm.id}/review/`} className="btn movie-card__button">
                                        Add review
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="movie-card__wrap movie-card__translate-top">
                        <div className="movie-card__info">
                            <div className="movie-card__poster movie-card__poster--big">
                                <img src={currentFilm.poster_image} alt={currentFilm.name}
                                     width="218" height="327"/>
                            </div>
                            <TabsTemplate film={currentFilm}/>
                        </div>
                    </div>
                </section>
                <div className="page-content">
                    <CatalogUi films={similarFilms} similarList={true} />
                </div>
            </>
        )
    }
}

export default MoviePageUi;
