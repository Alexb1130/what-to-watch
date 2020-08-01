import React from 'react';
import Logo from '../logo/Logo';
import FooterUi from '../footer/FooterUi';
import UserBlock from '../userBlock/UserBlockUi';
import MovieCardSmallUi from '../movieCards/MovieCardSmallUi';
import rootStore from '../../store';
import {observer} from 'mobx-react';

@observer
class Favorites extends React.Component {

    userStore = rootStore.userStore;

    componentDidMount() {
        this.userStore.getFavorite()
    }

    render() {
        const { favorites } = this.userStore;

        return (
            <div className="user-page">
                <header className="page-header user-page__head">
                    <Logo />

                    <h1 className="page-title user-page__title">My list</h1>

                    <UserBlock user={this.userStore.user} />
                </header>

                <section className="catalog">
                    <h2 className="catalog__title visually-hidden">Catalog</h2>

                    <div className="catalog__movies-list">
                        {favorites.map(film => (
                            <MovieCardSmallUi movie={film} key={film.id} />
                        ))}
                    </div>
                </section>

                <FooterUi />
            </div>
        )
    }
}

export default Favorites;