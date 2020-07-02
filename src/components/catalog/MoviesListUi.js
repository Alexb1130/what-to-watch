import React from 'react';
import MovieCardSmallUi from '../movieCards/MovieCardSmallUi';
import {observer} from "mobx-react";
import rootStore from '../../store';

@observer
class MoviesListUi extends React.Component {

    filmsStore = rootStore.filmsStore;

    state = {
        activeMovie: null,
    };

    mouseEnterHandle(movie) {
        this.setState({activeMovie: movie})
    }

    renderFilms() {

        const filmsStore = this.filmsStore;

        if(filmsStore.filteredFilms.length) {
           return filmsStore.filteredFilms.map(film => <MovieCardSmallUi movie={film} key={film.id} mouseEnterHandler={() => this.mouseEnterHandle(film)} />)
        }
        if(filmsStore.isNoFilmsSelectedGenre) {
            return <div>No films is selected category</div>
        }

        return filmsStore.filmsCopy.map(film => <MovieCardSmallUi movie={film} key={film.id} mouseEnterHandler={() => this.mouseEnterHandle(film)} />)
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
