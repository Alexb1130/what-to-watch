import React from 'react';
import MovieCardSmallUi from '../movieCards/MovieCardSmallUi';

class MoviesListUi extends React.Component {

    state = {
        activeMovie: null,
    };

    mouseEnterHandle(movie) {
        this.setState({
            activeMovie: movie
        })
    }

    render() {
        const { films } = this.props;

        return (
            <div className="catalog__movies-list">
                {films.map(film => (
                    <MovieCardSmallUi movie={film} key={film.id} mouseEnterHandler={() => this.mouseEnterHandle(film)} />
                ))}
            </div>
        )
    }
}

export default MoviesListUi;
