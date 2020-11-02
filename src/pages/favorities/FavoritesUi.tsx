import React, {useEffect} from 'react';
// @ts-ignore
import Logo from '@/components/logo/Logo';
// @ts-ignore
import FooterUi from '@/components/footer/FooterUi';
// @ts-ignore
import UserBlock from '@/components/userBlock/UserBlockUi';
// @ts-ignore
import MovieCardSmallUi from '@/components/movieCards/MovieCardSmallUi';
// @ts-ignore
import {useStore} from '@/store';
import {observer} from 'mobx-react';

const Favorites = observer(() => {

    const {userStore} = useStore();
    const {favorites} = userStore;

    useEffect(() => {
        userStore.getFavorite()
    }, [])

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
});

export default Favorites;
