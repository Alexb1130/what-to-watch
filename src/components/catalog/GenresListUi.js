import React from 'react';
import {observer} from "mobx-react";
import {DEFAULT_GENRE} from '../../common/constants';
import {withStore} from '../../store';

@withStore
@observer
class GenresListUi extends React.Component {

    filmsStore = this.props.store.films;

    state = {
        selectedGenre: DEFAULT_GENRE,
        genres: [
            {
                name: 'All genres'
            },
            {
                name: 'Comedies',
            },
            {
                name: 'Crime',
            },
            {
                name: 'Documentary',
            },
            {
                name: 'Adventure',
            },
            {
                name: 'Drama',
            },
            {
                name: 'Horror',
            },
            {
                name: 'Kids & Family',
            },
            {
                name: 'Romance',
            },
            {
                name: 'Sci-Fi',
            },
            {
                name: 'Thriller',
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
