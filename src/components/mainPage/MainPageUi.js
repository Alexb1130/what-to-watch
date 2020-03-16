import React from 'react';
import CatalogUi from '../catalog/CatalogUi';
import FooterUi from '../footer/FooterUi';
import MovieCardUi from "../movieCards/MovieCardUi";

const MainPageUi = () => {
    return (
        <React.Fragment>
            <MovieCardUi />
            <div className="page-content">
                <CatalogUi />
                <FooterUi />
            </div>
        </React.Fragment>
    )
};

export default MainPageUi;
