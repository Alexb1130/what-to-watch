import React from 'react';
import {observer} from "mobx-react";
import {GENRES ,DEFAULT_GENRE} from '@/common/constants';
import {withStore} from '@/store';

@withStore
@observer
class GenresListUi extends React.Component {

    filmsStore = this.props.store.films;

    state = {
        selectedGenre: DEFAULT_GENRE,
        genres: [...GENRES]
    };

    clickHandler(e, film) {
        e.preventDefault();
        this.setState({selectedGenre: film}, () => {

            this.filmsStore.filterByGenre(this.state.selectedGenre);
        });
    }

    render() {
        return (
            <ul className="catalog__genres-list">
                {this.state.genres.map((item, i) => (
                    <li key={item + i}
                        className={`catalog__genres-item ${this.state.selectedGenre === item && 'catalog__genres-item--active'}`}>
                        <a href="#" onClick={(e) => this.clickHandler(e, item)} className="catalog__genres-link">
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        )
    }
}

export default GenresListUi;
