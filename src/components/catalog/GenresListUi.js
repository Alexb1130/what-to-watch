import React from 'react';
import {observer} from "mobx-react";
import {DEFAULT_GENRE} from '../../common/constants';
import rootStore from '../../store';

@observer
class GenresListUi extends React.Component {

    filmsStore = rootStore.filmsStore;

    state = {
        selectedGenre: DEFAULT_GENRE,
        genres: [
            {
                name: 'All genres',
                route: '#'
            },
            {
                name: 'Comedies',
                route: '#'
            },
            {
                name: 'Crime',
                route: '#'
            },
            {
                name: 'Documentary',
                route: '#'
            },
            {
                name: 'Drama',
                route: '#'
            },
            {
                name: 'Horror',
                route: '#'
            },
            {
                name: 'Kids & Family',
                route: '#'
            },
            {
                name: 'Romance',
                route: '#'
            },
            {
                name: 'Sci-Fi',
                route: '#'
            },
            {
                name: 'Thriller',
                route: '#'
            }
        ]
    };

    clickHandler(e, film) {
        e.preventDefault();
        this.setState({selectedGenre: film.name}, () => {

            this.filmsStore.filterByGenre(this.state.selectedGenre);
        });
    }

    render() {
        return (
            <ul className="catalog__genres-list">
                {this.state.genres.map((item, i) => (
                    <li key={item.name + i}
                        className={`catalog__genres-item ${this.state.selectedGenre === item.name && 'catalog__genres-item--active'}`}>
                        <a href="#" onClick={(e) => this.clickHandler(e, item)} className="catalog__genres-link">
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        )
    }
}

export default GenresListUi;
