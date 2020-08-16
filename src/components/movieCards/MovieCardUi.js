import React from 'react';
import Logo from '../logo/Logo';
import UserBlock from '../../components/userBlock/UserBlockUi';
import {withStore} from '../../store';
import {observer} from 'mobx-react';
import VideoPlayerUi from "../videoPlayer/VideoPlayerUi";

@withStore
@observer
class CardUi extends React.Component {

    filmStore = this.props.store.films;
    userStore = this.props.store.user;

    state = {
        isStartVideoPlaying: false
    }

    componentDidMount() {
        this.filmStore.getPromoFilm()
    }

    _playHandle = () => {
        this.setState({isStartVideoPlaying: true})
    }

    _exitPlayer = () => {
        this.setState({isStartVideoPlaying: false})
    }

    favoriteHandler(id) {
        this.userStore.checkFavorite(id).then(index => {
            if (index !== -1) {
                this.userStore.removeFavorite(id).then(({ data }) => {
                    this.filmStore.getPromoFilm()
                })
            } else {
                this.userStore.addFavorite(id).then(({ data }) => {
                    this.filmStore.getPromoFilm()
                })
            }
        })
    }

    render() {

        const {isStartVideoPlaying} = this.state;
        const {currentPromoFilm} = this.filmStore;
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
            <>
            {
                isStartVideoPlaying &&
                <VideoPlayerUi
                    exitPlayer={this._exitPlayer}
                    isStartPlaying={isStartVideoPlaying}
                    film={currentPromoFilm}
                />
            }
            <section className="movie-card">
                <div className="movie-card__bg" style={{backgroundColor: background_color}}>
                    <img src={background_image} alt={name} />
                </div>

                <h1 className="visually-hidden">WTW</h1>

                <header className="page-header movie-card__head">

                    <Logo />

                    <UserBlock />
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
                                <button onClick={this._playHandle} className="btn btn--play movie-card__button">
                                    <svg viewBox="0 0 19 19" width="19" height="19">
                                        <use xlinkHref="#play-s" />
                                    </svg>
                                    <span>Play</span>
                                </button>
                                <button onClick={() => this.favoriteHandler(id)} className="btn btn--play movie-card__button">
                                    <svg viewBox="0 0 19 19" width="19" height="19">
                                        <use xlinkHref={is_favorite ? "#in-list" : "#add"} />
                                    </svg>
                                    <span>My list</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            </>
        )
    }
}

export default CardUi;
