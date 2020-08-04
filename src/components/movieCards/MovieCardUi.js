import React from 'react';
import Logo from '../logo/Logo';
import UserBlock from '../../components/userBlock/UserBlockUi';
import rootStore from '../../store';
import {observer} from 'mobx-react';

@observer
class CardUi extends React.Component {

    authorizationStore = rootStore.authorizationStore;
    filmStore = rootStore.filmsStore;
    userStore = rootStore.userStore;

    componentDidMount() {
        this.userStore.getUser();
        this.filmStore.getPromoFilm()
    }

    render() {

        const { currentPromoFilm } = this.filmStore;
        const {
            id,
            is_favorite,
            poster_image,
            preview_image,
            preview_video_link,
            background_color, 
            background_image, 
            name, 
            description, 
            director, 
            genre,
            rating,
            released,
            run_time,
            scores_count,
            starring,
            video_link
        } = currentPromoFilm;

        return (
            <section className="movie-card">
                <div className="movie-card__bg" style={{backgroundColor: background_color}}>
                    <img src={background_image} alt={name} />
                </div>

                <h1 className="visually-hidden">WTW</h1>

                <header className="page-header movie-card__head">

                    <Logo />

                    <UserBlock user={this.userStore.user} />
                </header>

                <div className="movie-card__wrap">
                    <div className="movie-card__info">
                        <div className="movie-card__poster">
                            <img src={poster_image} alt={name} width="218"
                                height="327" />
                        </div>

                        <div className="movie-card__desc">
                            <h2 className="movie-card__title">{name}</h2>
                            <p className="movie-card__meta">
                                <span className="movie-card__genre">{genre}</span>
                                <span className="movie-card__year">{released}</span>
                            </p>

                            <div className="movie-card__buttons">
                                <button className="btn btn--play movie-card__button">
                                    <svg viewBox="0 0 19 19" width="19" height="19">
                                        <use xlinkHref="#play-s" />
                                    </svg>
                                    <span>Play</span>
                                </button>
                                <button onClick={() => this.userStore.addFavorite(id)} className="btn btn--play movie-card__button">
                                    <svg viewBox="0 0 19 19" width="19" height="19">
                                        <use xlinkHref="#add" />
                                    </svg>
                                    <span>My list</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        )
    }
}

export default CardUi;
