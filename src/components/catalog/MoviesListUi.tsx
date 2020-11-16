import React from 'react';
import MovieCardSmallUi from '@/components/movieCards/MovieCardSmallUi';
import {observer} from "mobx-react";
import {Movie} from '@/types';

const MoviesListUi = observer((props: {films: Movie[]}) => {
    const {films} =  props;

    return (
        <div className="catalog__movies-list">
            {
                !films.length ? <div>No films is selected category</div> :
                    films.map(film => <MovieCardSmallUi movie={film} key={film.id}/>)
            }
        </div>
    )
})

export default MoviesListUi;
