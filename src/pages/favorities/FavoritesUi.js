import React from 'react';
import Logo from '@/components/logo/Logo';
import FooterUi from '@/components/footer/FooterUi';
import UserBlock from '@/components/userBlock/UserBlockUi';
import MovieCardSmallUi from '@/components/movieCards/MovieCardSmallUi';
import {withStore} from '@/store';
import {observer} from 'mobx-react';

@withStore
@observer
class Favorites extends React.Component {

    userStore = this.props.store.user;

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

                    <UserBlock />
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
