import React from 'react';
import Logo from '../logo/Logo';
import UserBlock from '../../components/userBlock/UserBlockUi';
import { rootStoreContent } from '../../context';

class CardUi extends React.Component {

    state = {
        user: null
    };

    static contextType = rootStoreContent;

    authorizationStore = this.context.authorizationStore;

    componentDidMount() {
        this.authorizationStore.checkAuthorization().then(data => {
            this.setState({user: data})
        })
    }

    render() {

        const {user} = this.state;

        return (
            <section className="movie-card">
                <div className="movie-card__bg">
                    <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
                </div>

                <h1 className="visually-hidden">WTW</h1>

                <header className="page-header movie-card__head">

                    <Logo />

                    <UserBlock user={user} />
                </header>

                <div className="movie-card__wrap">
                    <div className="movie-card__info">
                        <div className="movie-card__poster">
                            <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218"
                                height="327" />
                        </div>

                        <div className="movie-card__desc">
                            <h2 className="movie-card__title">The Grand Budapest Hotel</h2>
                            <p className="movie-card__meta">
                                <span className="movie-card__genre">Drama</span>
                                <span className="movie-card__year">2014</span>
                            </p>

                            <div className="movie-card__buttons">
                                <button className="btn btn--play movie-card__button">
                                    <svg viewBox="0 0 19 19" width="19" height="19">
                                        <use xlinkHref="#play-s" />
                                    </svg>
                                    <span>Play</span>
                                </button>
                                <button className="btn btn--play movie-card__button">
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
