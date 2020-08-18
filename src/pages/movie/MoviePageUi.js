import React from 'react';
import CatalogUi from '@/components/catalog/CatalogUi';
import FooterUi from "@/components/footer/FooterUi";
import MovieCardBigUi from "@/components/movieCards/MovieCardBigUi";

import {withStore} from "@/store";
import {observer} from "mobx-react";
import {withRouter} from "react-router-dom";

@withStore
@withRouter
@observer
class MoviePageUi extends React.Component {

    filmsStore = this.props.store.films;
    userStore = this.props.store.user;

    favoriteHandler = id => {
        this.userStore.checkFavorite(id).then(index => {
            if (index !== -1) {
                this.userStore.removeFavorite(id).then(({ data }) => {
                    this.filmsStore.getFilms();
                })
            } else {
                this.userStore.addFavorite(id).then(({ data }) => {
                    this.filmsStore.getFilms();
                })
            }
        })
    }

    render() {
        const {films, getCurrentFilm} = this.filmsStore;
        const {match} = this.props;
        const currentFilm = getCurrentFilm(films, match.params.id);

        const similarFilms = films.filter(film => film.genre === currentFilm.genre);

        return (
            <>
                <MovieCardBigUi
                    isFull
                    film={currentFilm}
                    favoriteHandler={this.favoriteHandler}
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
    }
}

export default MoviePageUi;
