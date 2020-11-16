import {Movie} from '@/types';
import React from 'react';
import GenresListUi from './GenresListUi';
import MoviesListUi from './MoviesListUi';
import ShowMoreBtn from './ShowMoreBtn';

interface Props {
    films: Movie[],
    similarList?: boolean
}

const CatalogUi = (props: Props) => {
    const {films, similarList = false} = props;

    return (
        <section className={`catalog ${similarList ? 'catalog--like-this': ''}`}>
            {
                similarList ? <h2 className="catalog__title">More like this</h2> :
                <h2 className="catalog__title visually-hidden">Catalog</h2>
            }

            {!similarList && <GenresListUi />}

            <MoviesListUi films={films} />

            {!similarList && <ShowMoreBtn />}
        </section>

    )
};

export default CatalogUi;
