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
                <CatalogUi />
                <FooterUi />
            </div>
        </>
    )
});

export default MainPageUi;
