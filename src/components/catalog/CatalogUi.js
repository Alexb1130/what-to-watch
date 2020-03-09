import React from 'react';
import GenresListUi from './GenresListUi';
import MoviesListUi from "./MoviesListUi";

const CatalogUi = props => {
    const {films} = props;

    return (
        <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenresListUi />
            <MoviesListUi films={films} />
        </section>
    )
};

export default CatalogUi;
