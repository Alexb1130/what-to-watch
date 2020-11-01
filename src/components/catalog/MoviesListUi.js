import React from 'react';
import MovieCardSmallUi from '@/components/movieCards/MovieCardSmallUi';
import {observer} from "mobx-react";
import {withStore} from '@/store';

@withStore
@observer
class MoviesListUi extends React.Component {

    filmsStore = this.props.store.filmsStore;

    state = {
        activeMovie: null,
    };

    renderFilms() {

        const filmsStore = this.filmsStore;

        if(filmsStore.filteredFilms.length) {
           return filmsStore.filteredFilms.map(film => <MovieCardSmallUi movie={film} key={film.id} />)
        }
        if(filmsStore.isNoFilmsSelectedGenre) {
            return <div>No films is selected category</div>
        }

        return filmsStore.filmsCopy.map(film => <MovieCardSmallUi movie={film} key={film.id} />)
    }

    render() {
        return (
            <div className="catalog__movies-list">
                {this.renderFilms()}
            </div>
        )
    }
}

export default MoviesListUi;
