import React from "react";
import {observer} from "mobx-react";
import {useStore} from '@/store';
import {FILMS_ROW_COUNT} from '@/constants';

const ShowMoreBtn = observer(() => {
    const {filmsStore} = useStore();
    const {currentFilms, currentFilmsRowCount} = filmsStore;
    const filmsCount = currentFilms.length;

    const clickHandler = () => {
        const newRenderedFilmCount = Math.min(filmsCount, currentFilmsRowCount + FILMS_ROW_COUNT);
        filmsStore.updateFilmsCount(newRenderedFilmCount);
    }

    return <div className="catalog__more">
        {currentFilmsRowCount < filmsCount &&
        <button onClick={clickHandler} className="catalog__button" type="button">Show more</button>}
    </div>
})

export default ShowMoreBtn;
