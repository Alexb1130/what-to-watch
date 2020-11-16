import React, {useEffect} from 'react';
import CatalogUi from '@/components/catalog/CatalogUi';
import FooterUi from '@/components/footer/FooterUi';
import MovieCardBigUi from "@/components/movieCards/MovieCardBigUi";

import {useStore} from '@/store';
import {observer} from 'mobx-react';

const MainPageUi = observer(() => {

    const {filmsStore} = useStore();
    const {userStore} = useStore();
    const {promoFilm} = filmsStore;
    const {currentFilms, currentFilmsRowCount} = filmsStore;

    const favoriteHandler = async id => {
        await userStore.updateFavorite(id);
        await filmsStore.getPromoFilm();
    }

    useEffect(() => {
        filmsStore.getPromoFilm()
    }, [])

    return (
        <>
            <MovieCardBigUi
                film={promoFilm}
                favoriteHandler={favoriteHandler}
            />
            <div className="page-content">
                <CatalogUi
                    films={currentFilms.slice(0, currentFilmsRowCount)}
                />
                <FooterUi />
            </div>
        </>
    )
});

export default MainPageUi;
