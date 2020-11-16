import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {GENRES, DEFAULT_GENRE} from '@/constants';
import {useStore} from '@/store';

const GenresListUi = observer(() => {
    const [selectedGenre, setSelectedGenre] = useState<string>(DEFAULT_GENRE)

    const {filmsStore} = useStore();

    const clickHandler = (event: React.MouseEvent<HTMLAnchorElement>, genre: string) => {
        event.preventDefault();
        setSelectedGenre(genre);
        filmsStore.changeSelectedGenre(genre);
    }

    useEffect(() => {
        setSelectedGenre(filmsStore.selectedGenre);
    }, [filmsStore.selectedGenre])

    return (
        <ul className="catalog__genres-list">
            {GENRES.map((item, i) => (
                <li key={item + i}
                    className={`catalog__genres-item ${selectedGenre === item && 'catalog__genres-item--active'}`}>
                    <a href="#" onClick={(event) => clickHandler(event, item)} className="catalog__genres-link">
                        {item}
                    </a>
                </li>
            ))}
        </ul>
    )
})

export default GenresListUi;
