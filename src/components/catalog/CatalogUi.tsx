import React from 'react';
import GenresListUi from './GenresListUi';
import MoviesListUi from './MoviesListUi';
import ShowMoreBtn from './ShowMoreBtn';

const CatalogUi = props => {
    const {similarList = false} = props;

    return (
        <section className={`catalog ${similarList ? 'catalog--like-this': ''}`}>
            {
                similarList ? <h2 className="catalog__title">More like this</h2> :
                <h2 className="catalog__title visually-hidden">Catalog</h2>
            }

            {!similarList && <GenresListUi />}

            <MoviesListUi />

            {!similarList && <ShowMoreBtn />}
        </section>

    )
};

export default CatalogUi;
