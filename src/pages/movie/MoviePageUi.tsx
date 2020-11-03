import React from 'react';
import {useStore} from "@/store";
import {observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import CatalogUi from '@/components/catalog/CatalogUi';
import FooterUi from "@/components/footer/FooterUi";
import MovieCardBigUi from "@/components/movieCards/MovieCardBigUi";

const MoviePageUi = withRouter(observer((props: RouteComponentProps) => {

    const {filmsStore} = useStore();
    const {userStore} = useStore();
    const {authorizationStore} = useStore();

    const favoriteHandler = async id => {
        await userStore.updateFavorite(id);
        await filmsStore.getFilms();
    }

    const {match} = props;
    const {isAuthorizationRequired} = authorizationStore;
    const {films, getCurrentFilm} = filmsStore;
    const currentFilm = getCurrentFilm(films, match.params.id);
    const similarFilms = films.filter(film => film.genre === currentFilm.genre);

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
                    <CatalogUi
                        films={similarFilms}
                        similarList={true}
                    />
                    <FooterUi/>
                </div>
            }
        </>
    )
}))

export default MoviePageUi;
