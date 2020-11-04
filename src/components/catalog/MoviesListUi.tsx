import React from 'react';
import MovieCardSmallUi from '@/components/movieCards/MovieCardSmallUi';
import {observer} from "mobx-react";
import {useStore} from '@/store';

const MoviesListUi = observer(() => {
    const {filmsStore} = useStore();
    const {currentFilms} = filmsStore;

    return (
        <div className="catalog__movies-list">
            {
                !currentFilms.length ? <div>No films is selected category</div> :
                    filmsStore.currentFilms.slice(0, filmsStore.currentFilmsRowCount).map(film => (
                        <MovieCardSmallUi movie={film} key={film.id}/>
                    ))
            }
        </div>
    )
})

export default MoviesListUi;
