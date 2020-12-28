import React from 'react';
import { useStore } from "@/store";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import CatalogUi from '@/components/catalog/CatalogUi';
import FooterUi from "@/components/footer/FooterUi";
import MovieCardBigUi from "@/components/movieCards/MovieCardBigUi";

const MoviePageUi = observer(() => {

    const { filmsStore } = useStore();
    const { userStore } = useStore();
    const { authorizationStore } = useStore();
    const { id } = useParams();

    const favoriteHandler = async id => {
        await userStore.updateFavorite(id);
        await filmsStore.getFilms();
    }

    const { isAuthorizationRequired } = authorizationStore;
    const { films, getCurrentFilm, getSimilarFilms } = filmsStore;
    const currentFilm = getCurrentFilm(films, id);
    const similarFilms = getSimilarFilms(currentFilm);

    return (
        <>
            <MovieCardBigUi
                isFull
                film={currentFilm}
                isAuthorizationRequired={isAuthorizationRequired}
                favoriteHandler={favoriteHandler}
            />
            {currentFilm &&
                <div className="page-content">
                    <CatalogUi films={similarFilms} similarList={true} />
                    <FooterUi />
                </div>
            }
        </>
    )
})

export default MoviePageUi;
