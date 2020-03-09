import React from 'react';

class GenresListUi extends React.Component {

    state = {
        selectedGenre: 'All genres',
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
                name: 'Dramas',
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
                name: 'Thrillers',
                route: '#'
            }
        ]
    };

    render() {
        return(
            <ul className="catalog__genres-list">
                {this.state.genres.map((item, i) => (
                    <li key={item.name + i} className={`catalog__genres-item ${this.state.selectedGenre === item.name && 'catalog__genres-item--active'}`}>
                        <a href="#" className="catalog__genres-link">
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        )
    }
}

export default GenresListUi;
